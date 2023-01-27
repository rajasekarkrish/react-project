from email.policy import default
from time import timezone
from typing import Optional
from typing_extensions import Required
from unicodedata import category
from django.db import models
from django.conf import settings
from multiselectfield import MultiSelectField
# from users.models import CustomUser
from django.conf import settings
from django.db import models
from django.utils import timezone
#from taskmanagement.core.users.models import CustomUser
import datetime
from datetime import timedelta
from django.core.exceptions import ValidationError




class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=250,  null=True,)
    company_description = models.CharField(max_length=250,  null=True,)
    address = models.CharField(max_length=250,  null=True,)
    
    

    class Meta:
        db_table = 'company'


    def __str__(self):
        return self.name


class Department(models.Model):
    dept_name = models.CharField(max_length=250, blank=True, null=True)
    company= models.ForeignKey(Company,on_delete=models.PROTECT)
    

    class Meta:
        db_table = 'department'
        unique_together = (('dept_name', 'company'),)

    def __str__(self):
        return self.dept_name
        

class Activityfrequency(models.Model):
    id=models.AutoField(primary_key=True)
    activityname=models.CharField(max_length=250,unique=True)

    class Meta:
        verbose_name_plural="activityfrequencies"
        db_table='activity_frequency'
        ordering=("id",)


    def __str__(self):
        return self.activityname


class ActivityCategory(models.Model):
    id = models.AutoField(primary_key=True)
    categoryname=models.CharField(max_length=250,unique=True)


    class Meta:
        verbose_name_plural="activitycategories"
        db_table='activity_category'


    def __str__(self):
        return self.categoryname

class CategoryType(models.Model):
    id = models.AutoField(primary_key=True)
    category=models.ForeignKey(ActivityCategory,on_delete=models.PROTECT)
    categorytype=models.CharField(max_length=250,unique=True)
    description=models.CharField(max_length=250,unique=True)


    class Meta:
        verbose_name_plural="category_types"
        db_table='category_type'
        



    def __str__(self):
        return self.categorytype


class Activity(models.Model):
    id=models.AutoField(primary_key=True)
    name_of_activity=models.CharField(max_length=250)
    activity_description=models.TextField(max_length=400)
    activity_frequency=models.ForeignKey(Activityfrequency,on_delete=models.PROTECT)
    activity_category = models.CharField(max_length=250)
    company= models.ForeignKey(Company,on_delete=models.PROTECT)
    department=models.ForeignKey(Department,on_delete=models.PROTECT)
    category_reference=models.CharField(max_length=250)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT,null=True)
    

    class Meta:
        verbose_name_plural="activities"
        db_table='activity'
        ordering=("id",)


    def __str__(self):
        return self.name_of_activity


class Status(models.Model):
    id=models.AutoField(primary_key=True)
    status=models.CharField(max_length=250,unique=True)

    class Meta:
        verbose_name_plural="status"
        db_table='status'
        ordering=("id",)


    def __str__(self):
        return self.status



        
class Task(models.Model):
    id=models.AutoField(primary_key=True)
    activity=models.ForeignKey(Activity,on_delete=models.PROTECT)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    start_date=models.DateTimeField(blank=True,null=True)
    end_date=models.DateTimeField(blank=True,null=True)
    status=models.ForeignKey(Status, on_delete=models.CASCADE,default=1)
    
    

    

    class Meta:
        verbose_name_plural="tasks"
        db_table='task'


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

        

class Usertask(models.Model):
    id=models.AutoField(primary_key=True)
    comments=models.CharField(max_length=50,blank=True,null=True)
    inserted_by=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT,default=2)
    Time_of_opened=models.DateTimeField(blank=True,null=True,)
    support_documents=models.FileField(upload_to='documents/%d/%m/%Y/', max_length=100,null=True,blank=True)
    status=models.ForeignKey(Status, on_delete=models.CASCADE,default=1)
    ticket=models.ForeignKey(Task,on_delete=models.PROTECT,null=True,blank=True)
    
    

    class Meta:
        verbose_name_plural="Usertasks"
        db_table='user_task'
        ordering=("-id",)

        