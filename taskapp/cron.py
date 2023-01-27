from apscheduler.schedulers.background import BackgroundScheduler
sched = BackgroundScheduler(timezone="Asia/kolkata")
from taskapp.models import *
from datetime import datetime, timedelta
from django.db.models import Q

def daily_task():
    #act_id = Task.objects.all().values_list('activity_id',flat=True)
    #obj=Activity.objects.filter(activity_frequency_id=1).exclude(id__in = act_id).values_list('id',flat=True)
    obj=Activity.objects.filter(activity_frequency_id=1).values_list('id',flat=True)
    for i in obj:   
        start_date = datetime.now()
        end_date = start_date + timedelta(days = 1)
        queryset=Activity.objects.get(id=i)
        print("userid....^^^^^^^^^",queryset.user_id)
        if queryset.user_id:
            print("userid....",queryset.user_id)
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
    print("***********111111")


def weekly_task():
    # act_id = Task.objects.all().values_list('activity_id',flat=True)
    # obj=Activity.objects.filter(activity_frequency_id=2).exclude(id__in = act_id).values_list('id',flat=True)
    # if len(obj) != 0:
    obj=Activity.objects.filter(activity_frequency_id=2).values_list('id',flat=True)
    for i in obj:   
        start_date = datetime.now()
        end_date = start_date + timedelta(days = 1)
        queryset=Activity.objects.get(id=i)
        print("userid....^^^^^^^^^",queryset.user_id)
        if queryset.user_id:
            print("userid....",queryset.user_id)
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
    

def monthly_task():
    # act_id = Task.objects.all().values_list('activity_id',flat=True)
    # obj=Activity.objects.filter(activity_frequency_id=3).exclude(id__in = act_id).values_list('id',flat=True)
    obj=Activity.objects.filter(activity_frequency_id=3).values_list('id',flat=True)
    for i in obj:   
        start_date = datetime.now()
        end_date = start_date + timedelta(days = 1)
        queryset=Activity.objects.get(id=i)
        print("userid....^^^^^^^^^",queryset.user_id)
        if queryset.user_id:
            print("userid....",queryset.user_id)
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
   
# def period1():
#     print("***********22222222222")
#     pass
	
def start():
    sched.add_job(id=None,func=daily_task,trigger='cron',max_instances=1,day_of_week='mon-sat',hour=18,minute=0,second=0)
    sched.add_job(id=None,func=weekly_task,trigger='cron',max_instances=1,day_of_week='mon', hour=1, minute=0,second=0)
    sched.add_job(id=None,func=monthly_task,trigger='cron',max_instances=1,month='1-12',day=1,hour=2,minute=0,second=0)
    sched.start()


