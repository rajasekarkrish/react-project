from email.utils import format_datetime
from functools import partial
from multiprocessing.dummy import Value
from urllib import response
from xml.dom.minidom import Identified
from django.shortcuts import render
from .serializers import ActivitySerializer
from rest_framework import generics,viewsets,parsers
from taskapp.models import Activity, ActivityCategory,Activityfrequency,Status
from taskapp.models import Company
from taskapp.models import Department
from users.models import CustomUser,CustomAccountManager
from .serializers import CompanySerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import *
from users.serializers import RegisterUserSerializer
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta
from rest_framework.views import APIView
from users.serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django_cron import CronJobBase, Schedule

from django.core.files.storage import FileSystemStorage


class CompanyList(viewsets.ViewSet):
    def get_company(self,request):
        # comp=self.request.query_params.get('name')
        queryset = Company.objects.all()
        serializer= CompanySerializer(queryset,many=True,required=True).data
        return Response({'data':serializer})

    def get_departments(self,request,id):
        queryset = Department.objects.filter(company_id=id)
        serializer_class = DepartmentSerializer(queryset,many=True).data
        return Response({'data':serializer_class})


    def post(self,request):
        data = request.data 
        name = data['name']
        company_description=data['company_description']
        address=data['address']
        obj=Company(name=name,company_description=company_description,address=address)
        obj.save()
        return Response({'data':'company added successfully'})

    def put(self,request,id):
        data=request.data 
        name=data['name']
        description=data['company_description']
        address=data['address']
        queryset=Company.objects.filter(id=id).update(name=name,company_description=description,address=address) 
        return Response("your fields is updated")
        
 





class DepartmentList(viewsets.ViewSet):
    def get_department(self,request):
        queryset = Department.objects.all()
        serializer_class = DepartmentSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def post(self,request):
            data = request.data 
            # dept_id = data['id']
            dept_name = data['dept_name']
            company_id=data['company_id']
            # obj=Department(id=dept_id,dept_name=dept_name,company_id=company_id)
            obj=Department(dept_name=dept_name,company_id=company_id)
            obj.save()
            return Response({'data':'Department added successfully'})

    def put(self,request,id):
        data=request.data 
        dept_name = data['dept_name']
        company_id=data['company_id']
        queryset=Department.objects.filter(id=id).update(dept_name=dept_name,company_id=company_id)
        return Response({'data':'Values updated successfully'})




class DeptList(viewsets.ViewSet):
    def get_department(self,request):
        queryset = Department.objects.all()
        serializer_class = DepartmentsSerializer(queryset,many=True).data
        return Response({'data':serializer_class})
        

class UserList(viewsets.ViewSet):
    def get_user(self,request):
        queryset = CustomUser.objects.filter().exclude(company_id__isnull=True)
        serializer_class = RegisterUserSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    
    def post(self,request):
        data = request.data
        email=data['email']
        user_name=data['user_name']
        password=make_password(data['password'])
        is_staff=data['is_staff']
        is_active=data['is_active']
        company_id=data['company']
        department_id=data['department']
        assign_to_id=data['assign_to']
        obj=CustomUser(email=email,user_name=user_name,password=password,is_staff=is_staff,is_active=is_active,company=company_id,
        department=department_id,assign_to=assign_to_id)
        obj.save()
        return Response("user created successfully", status=status.HTTP_201_CREATED)
        


    def put(self,request,id):
        data=request.data 
        email=data['email']
        user_name=data['user_name']
        is_active=data['is_active']
        is_staff=data['is_staff']
        queryset=CustomUser.objects.filter(id=id).update(id=id,email=email,user_name=user_name,is_active=is_active,is_staff=is_staff) 
        return Response("your fields is updated")

   


class UserNameList(viewsets.ViewSet):
    def get_user(self,request):
        queryset = CustomUser.objects.all()
        serializer_class = UserNameSerializer(queryset,many=True).data
        return Response({'data':serializer_class})



    def dept_user(self,request,id):
        queryset=CustomUser.objects.filter(department_id=id)
        serializer_class = UserNameSerializer(queryset,many=True).data
        return Response({'data':serializer_class})




class CategoryList(viewsets.ViewSet):
    def get_category(self,request):
        #queryset = ActivityCategory.objects.all().values_list('categoryname',flat=True)
        queryset=ActivityCategory.objects.all()
        serializer_class = CategorySerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def post(self,request):
        data = request.data 
        category_name = data['categoryname']
        # listToStr = ','.join([str(elem) for elem in category_name])
        obj=ActivityCategory(categoryname=category_name)
        obj.save()
        return Response({'data':'category added successfully'})


    def put(self,request,id):
        data=request.data 
        categoryname=data['categoryname']
        queryset=ActivityCategory.objects.filter(id=id).update(categoryname=categoryname,) 
        return Response("your fields is updated")
        





class FrequencyList(viewsets.ViewSet):
    def get_frequency(self,request):
        queryset=Activityfrequency.objects.all()
        serializers_class=ActivityFrequencySerializer(queryset,many=True).data
        return Response({'data':serializers_class})

    def post(self,request):
        data=request.data 
        # id=data['id']
        frequency=data['activityname']
        obj=Activityfrequency(activityname=frequency)
        obj.save()
        return Response({'data':'frequency added sucessfully'})

    def put(self,request,id):
        data=request.data 
        activityname=data['activityname']
        queryset=Activityfrequency.objects.filter(id=id).update(activityname=activityname,) 
        return Response("your fields is updated")


class ActivityList(viewsets.ViewSet):
    def get_activity(self,request):
        queryset = Activity.objects.all()
        serializer_class = ActivitySerializer(queryset,many=True,allow_null=True).data
        return Response({'data':serializer_class})


    def post(self,request):
        data = request.data 
        activity_name = data['name_of_activity']
        activity_description = data['activity_description']
        activity_frequency = data['activity_frequency']
        activity_category = data['activity_category']
        listToStr = ([(elem) for elem in activity_category])
        print("printing list",listToStr)
        company_id = data['company']
        department_id = data['department']
        category_reference=data['category_reference']
        x = ([(elem) for elem in category_reference])
        #user_id = data['user']
        obj=Activity(name_of_activity=activity_name,activity_description=activity_description,activity_frequency_id=activity_frequency,
        activity_category=listToStr,company_id=company_id,department_id=department_id,category_reference=x,)
        obj.save()
        return Response({'data':'activity added successfully'})

    def activity_del(self,request,id):
        queryset=Activity.objects.filter(id=id).delete()
        return Response({"msg":"record is deleted "})

    def act_dept(self,request,id):
        queryset=Activity.objects.filter(department_id=id)
        serializer_class = ActivitySerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def get_actuserlist(self,request,id):
        queryset=Activity.objects.filter(user_id=id)
        serializer_class=ActivityListSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    
    

    def put(self,request):
        data=request.data
        user_id=data['user_id']
        activity_id=data['activity_id']
        obj=Activity.objects.filter(id__in=activity_id).update(user_id=user_id)
        return Response("updated sucessfully")
             

class CategoryTypeView(viewsets.ViewSet):
    def get_categorytype(self,request):
        queryset=CategoryType.objects.all()
        serializer_class = CategoryTypeSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def get_categoryreference(self,request):
        queryset=CategoryType.objects.all()
        serializer_class=CategoryReferenceSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

        
    
    def post(self,request):
        data=request.data 
        category=data['category']
        categorytype=data['categorytype']
        description=data['description']
        obj=CategoryType(category_id=category,categorytype=categorytype,description=description)
        obj.save()
        return Response({'data':'categorytype created successfully'})




class TaskList(viewsets.ViewSet):
    def get_task(self,request):
        queryset=Task.objects.all()
        serializer_class = TaskSerializer(queryset,many=True).data
        return Response({'data':serializer_class})


    def get_actusertasklist(self,request,id):
        queryset=Task.objects.filter(user_id=id)
        serializer_class=TaskSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def get_userlistdaily(self,request,id):
        data=request.data 
        status_id=self.request.query_params.get('status_id')
        if status_id:
            queryset=Task.objects.filter(user_id=id,status_id=status_id,activity__activity_frequency__id__icontains=1)
            queryset1=Task.objects.filter(user_id=id,status_id=status_id,activity__activity_frequency__id__icontains=1).count()
        else:
            queryset=Task.objects.filter(user_id=id,activity__activity_frequency__id__icontains=1)
            queryset1=Task.objects.filter(user_id=id,activity__activity_frequency__id__icontains=1).count()
        serializer_class=TaskSerializer(queryset,many=True).data  
        return Response({'data':serializer_class,"record_count":queryset1})

    def get_userlistweekly(self,request,id):
        status_id=self.request.query_params.get('status_id')
        if status_id:
            queryset=Task.objects.filter(user_id=id,status_id=status_id,activity__activity_frequency__id__icontains=2)
            queryset1=Task.objects.filter(user_id=id,status_id=status_id,activity__activity_frequency__id__icontains=2).count()
        else:
            queryset=Task.objects.filter(user_id=id,activity__activity_frequency__id__icontains=2)
            queryset1=Task.objects.filter(user_id=id,activity__activity_frequency__id__icontains=2).count()
        serializer_class=TaskSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def get_userlistmonthly(self,request,id):
        status_id=self.request.query_params.get('status_id')
        if status_id:
            queryset=Task.objects.filter(user_id=id,status_id=status_id,activity__activity_frequency__id__icontains=3)
        else:
             queryset=Task.objects.filter(user_id=id,activity__activity_frequency__id__icontains=3)
        serializer_class=TaskSerializer(queryset,many=True).data
        return Response({'data':serializer_class})


    def get_status_id(self,request):
        data=request.data
        user_id=data['user_id']
        status_id=data['status_id']
        queryset=Task.objects.filter(user_id=user_id,status_id=status_id)
        serializer_class=TaskSerializer(queryset,many=True).data
        return Response({'data':serializer_class})








    from datetime import datetime, timedelta
    

    def bulk_post(self,request):
        data=request.data 
        frequency_id=data['frequency_id']
        obj=Activity.objects.filter(activity_frequency_id=frequency_id).values_list('id',flat=True)
        for i in obj:   
            start_date = datetime.now()
            end_date = start_date + timedelta(days = 1)
            queryset=Activity.objects.get(id=i)
            if queryset.activity_frequency_id==1:
                end_date = start_date + timedelta(days = 1)
            elif queryset.activity_frequency_id==2:
                end_date = start_date + timedelta(days = 7)
            elif queryset.activity_frequency_id==3:
                end_date = start_date + timedelta(days = 30) 
            obj=Task(activity_id=i,user_id=queryset.user_id,start_date=start_date,end_date=end_date,)
            obj.save()
            ticket_id=obj.id
            obj1=Usertask(ticket_id=ticket_id,comments="ticket created")
            obj1.save()
        return Response({'data':'task created successfully'})

    
        


    def put(self,request,id):
        data=request.data
        status_id=data['status_id']
        obj=Task.objects.filter(activity__id=id).update(status_id=status_id)

        obj2=Status.objects.get(id=status_id).status
        return Response({
            'data':"log added successfully",
            "status":obj2
        })    



class StatusList(viewsets.ViewSet):
    def get_status(self,request):
        queryset=Status.objects.all()
        serializer_class = StatusSerializer(queryset,many=True).data
        return Response({'data':serializer_class})

    def post(self,request):
        data = request.data 
        status = data['status']
        obj=Status(status=status)
        obj.save()
        return Response({'data':'Status added successfully'})

    def put(self,request,id):
        data=request.data 
        status=data['status']
        queryset=Status.objects.filter(id=id).update(status=status,) 
        return Response("your fields is updated")



class UserTaskList(viewsets.ViewSet):
    def get_usertask(self,request):
        queryset=Usertask.objects.all()
        serializer_class = UserLogSerializer(queryset,many=True).data
        #parser_classes = [parsers.MultiPartParser, parsers.FormParser]
        return Response({'data':serializer_class})

    def get_userlog(self,request,id):
        queryset=Usertask.objects.filter(ticket_id=id)
        serializer_class = UserLogSerializer(queryset,many=True).data
        return Response({'data':serializer_class})




    def post(self,request):
        data=request.data 
        print(data)
        request_file = request.FILES['document'] if 'document' in request.FILES else None
        print("asdfgh", request_file)
        if request_file:
            fs = FileSystemStorage()
            file = fs.save(request_file.name, request_file)
            print("fileeeeeeeeeeeeeeeeeee",file)
            fileurl = fs.url(file)
            print("fileeeeeeeeeeeeeurlllllllllll",fileurl)
            url="http://127.0.0.1:8000"+fileurl 

        status_id=data['status_id']
        comments=data['comments']
        inserted_by_id=data['inserted_by_id']
        Time_of_opened = datetime.now()
        ticket_id=data['ticket_id']
        #support_documents=file['support_documents']
        try:
            obj=Usertask(status_id=status_id,Time_of_opened=Time_of_opened,comments=comments,inserted_by_id=inserted_by_id,ticket_id=ticket_id,support_documents=url)
            obj.save()
        except UnboundLocalError:
            obj=Usertask(status_id=status_id,Time_of_opened=Time_of_opened,comments=comments,inserted_by_id=inserted_by_id,ticket_id=ticket_id,support_documents=None)    
            obj.save()
        # Usertask.objects.filter(ticket_id=ticket_id).update(status_id=status_id,Time_of_opened=Time_of_opened,comments=comments,inserted_by_id=inserted_by_id)
        return Response({'data':"log added successfully"})
        

    def user_update(self,request,id):
        data=request.data
        status_id=data['status_id']
        obj=Usertask.objects.filter(id=id).update(status_id=status_id)
        return Response("updated successfully")  
        

        
class LoggedInUserView(APIView):
    def get(self, request):
        permission_classes = (IsAuthenticated,)
        serializer = UserNameSerializer(self.request.user)
        return Response(serializer.data)

def sendCustomMail(message, recepiants, subject,template):
    email_html_message = render_to_string(template, message)
    email = EmailMultiAlternatives(subject, email_html_message, settings.DEFAULT_FROM_EMAIL, [recepiants])
    email.attach_alternative(email_html_message, "text/html")
    email.send()




def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@csrf_exempt
@api_view(['GET', 'POST'])
def ForgetPassword(request):
    if request.method == 'POST':
        # data = request.data
        email = request.data['Email']
        print(email)
        # if 'Email' not in data:
        #     return Response('Email Address is Required', 401, False)
        user = CustomUser.objects.get(email=email, is_active=True)
        token = get_tokens_for_user(user)
        time = datetime.now() + timedelta(hours=2)
        serializer = ResetTokenSerializer(
            data={'user': user.id, 'jwt_token': token['access'], 'expire_ts': time})
        if serializer.is_valid():
            serializer.save()
        context = {
            'email': email,

            'reset_password_url':'http://localhost:3000/' + token['access'],
        }

        subject = "Reset Password"
        recepiants = email
    

        sendCustomMail(context, recepiants, subject, 'resetpassword.html')
        return Response('Email_Sent', 200, True)

@csrf_exempt
@api_view(['POST'])
def save_reset_password(request):
    if request.method == 'POST':
        data = request.data
        password = data['password']
        jwt_token = data['jwt_token']
        try:
            valid = AuthTokenMstr.objects.get(jwt_token=jwt_token)
        except AuthTokenMstr.DoesNotExist:
            return Response('Invalid Token', 401, True)
        import pytz
        utc = pytz.UTC

        curnt_time = datetime.now()
        dt_string = str(valid.expire_ts)
        new_dt = dt_string[:19]
        curnt_time = datetime.strptime(str(curnt_time), '%Y-%m-%d %H:%M:%S.%f')
        expire_ts = datetime.strptime(new_dt, '%Y-%m-%d %H:%M:%S')


        curnt_time = curnt_time.replace(tzinfo=utc)
        expire_ts = expire_ts.replace(tzinfo=utc)

        if expire_ts <= curnt_time:
            return Response('Token is Expired', 401, False)
        if 'password' not in data:
            return Response('New Password is Required', 400, False)
        if 'jwt_token' not in data:
            return Response('Token is Required', 400, False)
        if jwt_token and password:
            profile_id = valid.user.id
            user = CustomUser.objects.get(id=profile_id)
            if user:
                newpassword = make_password(password)
                user.password = newpassword
                user.save()
                return Response('Password Changed Successfully', 200, True)
            else:
                return Response('User_Not_Exists', 404, False)
        else:
            return Response("Invalid Inputs", 400, False)



     


# class MyCronJob(CronJobBase):
#     RUN_AT_TIMES = ['12:00',]

#     schedule = Schedule(run_every_mins=RUN_AT_TIMES)
#     code = 'my_app.my_cron_job'    # a unique code

#     def cron(self,request):
#         data=request.data 
#         frequency_id=data['frequency_id']
#         obj=Activity.objects.filter(activity_frequency_id=frequency_id).values_list('id',flat=True)
#         for i in obj:   
#             start_date = datetime.now()
#             end_date = start_date + timedelta(days = 1)
#             queryset=Activity.objects.get(id=i)
#             if queryset.activity_frequency_id==1:
#                 end_date = start_date + timedelta(days = 1)
#             obj=Task(activity_id=i,user_id=queryset.user_id,start_date=start_date,end_date=end_date,)
#             obj.save()
#         return Response({'data':'task created successfully'})






        

        
          


    # def task_post(self,request):
    #     data=request.data 
    #     frequency_id=data['frequency_id']
    #     frequency_id=Task.objects.filter(activity__activity_frequency__id__icontains=frequency_id)
    #     serializers=TaskSerializer(frequency_id,many=True).data
    #     print(object)
    #     return Response({'data':serializers})
        


        

    

