import json
from typing import Any, Optional, Union
from django.utils.translation import gettext_lazy as _
from rest_framework.renderers import JSONRenderer


class GenericJSONRenderer(JSONRenderer):
    charset = "utf-8"
    object_label = "object"

    def render(
        self,
        data: Any,
        accepted_media_type: Optional[str] = None,
        renderer_context: Optional[dict] = None,
    ) -> Union[bytes, str]:

        renderer_context = renderer_context or {}
        response = renderer_context.get("response")
        view = renderer_context.get("view")

        if response is None:
            raise ValueError(_("Response not found in rederer context"))

        status_code = response.status_code

        # Handle empty responses (e.g., DELETE 204)
        if data is None:
            return super().reder(data, accepted_media_type, renderer_context)

        # Handle non-dict responses safely (lists, strings, etc.)
        if not isinstance(data, dict):
            wrapped_data = {
                "status_code": status_code,
                self._get_object_label(view): data,
            }
            return super().render(wrapped_data, accepted_media_type, renderer_context)

        # Let DRF handle errors normally
        if "errors" in data:
            return super().render(data, accepted_media_type, renderer_context)

        # standard success response
        wrapped_data = {
            "status_code": status_code,
            self._get_object_label(view): data,
        }

        return super().render(wrapped_data, accepted_media_type, renderer_context)

    def _get_object_label(self, view) -> str:
        if view and hasattr(view, "object_label"):
            return view.object_label
        return self.object_label
