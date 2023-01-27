from contextlib import nullcontext
from dataclasses import fields
from unicodedata import category
from rest_framework import serializers
from taskapp.models import *
from users.models import *
import ast




class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Department
        fields=('id','dept_name',)

class DepartmentsSerializer(serializers.ModelSerializer):
     name = serializers.SerializerMethodField('get_department')
     def get_department(self, data):
        id = data.company_id
        obj=Company.objects.get(id=id).name
        return obj
     
     class Meta:
        model=Department
        fields='__all__'



class CompanySerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, trim_whitespace=True)
    company_description = serializers.CharField(required=True, trim_whitespace=True)
    address = serializers.CharField(required=True, trim_whitespace=True)
    
    class Meta:
        model=Company
        fields=('id','name','company_description','address',)

    def validate(self, attrs):
        if attrs['name'] or attrs['company_description'] or attrs['address'] == None or "":
            raise serializers.ValidationError("fields cannot be null")
        return attrs              
    
            
        
        

class UserSerializer(serializers.ModelSerializer):
    assign=serializers.SerializerMethodField('get_repotingto')
    def get_repotingto(self,data):
        id=data.assign_to_id
        obj=CustomUser.objects.get(id=id).user_name
        return obj

    class Meta:
        model=CustomUser
        fields=('id','user_name','company','department','is_staff','is_active','assign',)


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=('id','user_name')



class ActivityFrequencySerializer(serializers.ModelSerializer):
    class Meta:
        model=Activityfrequency
        fields=('id','activityname')


class CategorySerializer(serializers.ModelSerializer):    
    class Meta:
        model=ActivityCategory
        fields=('id','categoryname',)

class CategoryReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model=CategoryType
        fields=('id','categorytype',)

class ActivitySerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField('get_company')
    def get_company(self, data):
        id = data.company_id
        # obj=Company.objects.get(id=id)
        # serializer = CompanySerializer(obj).data
        obj=Company.objects.get(id=id).name
        return obj

    department = serializers.SerializerMethodField('get_department')
    def get_department(self, data):
        id = data.department_id
        obj=Department.objects.get(id=id).dept_name
        return obj
        
        
    activity_category = serializers.SerializerMethodField('get_cat')
    def get_cat(self, data):
        a=[]
        activity_category=data.activity_category
        res = ast.literal_eval(activity_category)
        #obj=ActivityCategory.objects.filter(id__in=res)
        for i in res:
            ac=ActivityCategory.objects.get(id=i).categoryname
            a.append(ac)
        #serializers=CategorySerializer(obj,many=True).data
        return a
        
    category_reference=serializers.SerializerMethodField('get_reference')
    def get_reference(self,data):
        b=[]
        category_reference=data.category_reference
        res = ast.literal_eval(category_reference)
        for i in res:
            reference=CategoryType.objects.get(id=i).categorytype
            b.append(reference)
        return b


    activity_frequency= serializers.SerializerMethodField('get_frequency')
    def get_frequency(self, data):
        id = data.activity_frequency_id
        obj=Activityfrequency.objects.get(id=id).activityname 
        return obj


    user_id=serializers.SerializerMethodField('get_user')
    def get_user(self, data):
        id = data.user_id
        try:
            obj=CustomUser.objects.get(id=id).user_name
        except:
            obj=None  
        return obj

       
    class Meta:
        model=Activity
        fields=('id','name_of_activity','activity_description','activity_frequency','activity_category','department','company','category_reference','user_id',)

# class Actserializer(serializers.ModelSerializer):
#     class Meta:
#         model=Activity
#         fields=('id','name_of_activity','activity_description',)
        
    
class CategoryTypeSerializer(serializers.ModelSerializer):
    category=serializers.SerializerMethodField('get_cattype')

    def get_cattype(self,data):
        id=data.category_id
        obj=ActivityCategory.objects.get(id=id).categoryname
        return obj
    
    class Meta:
        model=CategoryType
        fields=('id','categorytype','description','category')





class TaskSerializer(serializers.ModelSerializer):
    activity_detail=serializers.SerializerMethodField('get_activity')
    def get_activity(self,data):
        id=data.activity_id
        obj=Activity.objects.get(id=id)
        serializers=ActivitySerializer(obj).data
        return serializers

    user_detail=serializers.SerializerMethodField('get_user')
    def get_user(self,data):
        id=data.user_id
        obj=CustomUser.objects.get(id=id)
        serializers=UserSerializer(obj).data
        return serializers

    status=serializers.SerializerMethodField('get_status')
    def get_status(self,data):
        id=data.status_id
        print("statusid",id)
        obj=Status.objects.get(id=id)
        print("statusssss",obj)
        serializers=StatusSerializer(obj).data
        return serializers
    
    
    class Meta:
        model=Task
        fields='__all__'



class ActSerializer(serializers.ModelSerializer):
    class Meta:
        model=Activity
        fields=('activity_frequency_id',)


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model=Status
        fields='__all__'


class ActivityListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Activity
        fields=('name_of_activity','activity_description',)

        
class UserLogSerializer(serializers.ModelSerializer):
    insert_by=serializers.SerializerMethodField('get_insertby')
    def get_insertby(self,data):
        id=data.inserted_by_id
        obj=CustomUser.objects.get(id=id).user_name
        return obj

    status=serializers.SerializerMethodField('get_status')
    def get_status(self,data):
        id=data.status_id
        obj=Status.objects.get(id=id).status
        return obj



    class Meta:
        model=Usertask
        fields=('id','comments','Time_of_opened','insert_by','status','ticket_id',)

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model=Status
        fields=('id','status',)



class FileSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)


