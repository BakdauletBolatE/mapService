from rest_framework import routers
from .views import PolyLineViewSet,PolyLineTypesViewSet

router = routers.DefaultRouter()
router.register('polyline', PolyLineViewSet, 'polyline')
router.register('polyline-types', PolyLineTypesViewSet, 'polyline-types')

urlpatterns = router.urls