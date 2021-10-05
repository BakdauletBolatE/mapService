from .serilizers import PolyLineSerializer,PolylinesTypesSerilizer
from .models import PolyLine,PolyLineTypes
from django.shortcuts import render
from rest_framework import viewsets,permissions
# Create your views here.


class PolyLineViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]
    queryset = PolyLine.objects.all()
    serializer_class = PolyLineSerializer


class PolyLineTypesViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]
    queryset = PolyLineTypes.objects.all()
    serializer_class = PolylinesTypesSerilizer


