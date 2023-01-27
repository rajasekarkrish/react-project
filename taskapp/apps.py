# from django.apps import AppConfig


# class TaskappConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'taskapp'


from django.apps import AppConfig
class TaskappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'taskapp'

    def ready(self):
        from taskapp.cron import start
        start()