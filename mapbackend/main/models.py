from django.db import models

# Create your models here.



class PolyLineTypes(models.Model):
    
    name = models.CharField(max_length=255, blank=True,null=True)

    def __str__(self):
        return self.name

class PolyLine(models.Model):

    choisesTypeMarker = (
    (1, 'Жол'),
    (2, 'Су'),
    (3, 'Кубыр'),
)
    km = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True,null=True)
    description = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    typeMarker = models.ForeignKey(PolyLineTypes, null=True, blank=True, on_delete=models.CASCADE, related_name="polyline")

    
class Positions(models.Model):

    index = models.IntegerField(blank=True, null=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    polyline = models.ForeignKey(PolyLine,on_delete=models.CASCADE,related_name='positions')

