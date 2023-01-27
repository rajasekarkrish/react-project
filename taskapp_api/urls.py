from django.urls import path
from django.views.generic import TemplateView
from .views import *




from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


app_name='taskapp_api'

urlpatterns = [
    # path('<int:pk>/',PostDetail.as_view(),name='detailcreate'),
    path('task',ActivityList.as_view({'get':'get_activity','post':'post','put':'put'}),name='listcreate'),
    path('company',CompanyList.as_view({'get':'get_company','post':'post',}),name='companylist'),
    path('up_comp/<int:id>',CompanyList.as_view({'put':'put'})),
    path('department',DepartmentList.as_view({'get':'get_department','post':'post'}),name='deptlist'),
    path('up_dept/<int:id>',DepartmentList.as_view({'put':'put'}),name='deptlist'),
    path('get_dept/<int:id>',CompanyList.as_view({'get':'get_departments'}),name='deptlist'),
    path('userlist',UserList.as_view({'get':'get_user','post':'post'}),name='userlist'),
    path('category',CategoryList.as_view({'get':'get_category','post':'post'}),name='categorylist'),
    path('category/<int:id>',CategoryList.as_view({'put':'put'}),name='categorylist'),
    path('frequency', FrequencyList.as_view({'get':'get_frequency','post':'post'}),name='frequencylist'),
    path('frequency/<int:id>', FrequencyList.as_view({'put':'put'}),name='frequencylist'),
    path('delete/<int:id>',ActivityList.as_view({'delete':'activity_del'}),name='activitydellist'),
    path('depts',DeptList.as_view({'get':'get_department'})),
    path('userupdate/<int:id>',UserList.as_view({'put':'put'})),
    path('categorytype',CategoryTypeView.as_view({'get':'get_categorytype','post':'post'})),
    path('categoryreference',CategoryTypeView.as_view({'get':'get_categoryreference'})),
    path('users',UserNameList.as_view({'get':'get_user'})),
    path('activity_dept/<int:id>',ActivityList.as_view({'get':'act_dept'})),
    path('dept_user/<int:id>',UserNameList.as_view({'get':'dept_user'})),
    path('task',ActivityList.as_view({'put':'put',})),
    path('tasklist',TaskList.as_view({'get':'get_task','post':'post'})),
    path('taskpost',TaskList.as_view({'get':'get_task','post':'bulk_post',})),
    path('taskpost/<int:id>',TaskList.as_view({'put':'put',})),
    path('fre/<int:id>',ActivityList.as_view({'get':'fre',})),
    path('status',StatusList.as_view({'get':'get_status','post':'post'})),
    path('status/<int:id>',StatusList.as_view({'put':'put'})),
    path('status',StatusList.as_view({'get':'get_status','post':'post'})),
    path('usertask',UserTaskList.as_view({'get':'get_usertask','post':'post',})),
    path('usertask/<int:id>',UserTaskList.as_view({'get':'get_userlog',})),
    path('usertask/<int:id>',UserTaskList.as_view({'put':'user_update',})),
    path('loginuser', LoggedInUserView.as_view()),
    path('useractivity/<int:id>',ActivityList.as_view({'get':'get_actuserlist',}),name='actuserlist'),
    path('usertaskactivity/<int:id>',TaskList.as_view({'get':'get_actusertasklist',})),
    path('userdaily/<int:id>',TaskList.as_view({'get':'get_userlistdaily',})),
    path('userweekly/<int:id>',TaskList.as_view({'get':'get_userlistweekly',})),
    path('usermonthly/<int:id>',TaskList.as_view({'get':'get_userlistmonthly',})),
    path('taskstatus',TaskList.as_view({'get':'get_status_id',})),
    path('forget_password/', ForgetPassword, name='forget_password'),
    path('reset_password/', save_reset_password, name='reset_password'),

    # path('status',StatusList.as_view({'get':'get_status',})),
    
]

