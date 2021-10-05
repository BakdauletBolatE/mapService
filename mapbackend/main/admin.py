from django.contrib import admin
from .models import Positions,PolyLine,PolyLineTypes

# Register your models here.

admin.site.register(Positions)
admin.site.register(PolyLine)
admin.site.register(PolyLineTypes)