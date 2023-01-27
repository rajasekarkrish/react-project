from select import select
from django.contrib import admin
from .models import*


admin.site.register(Company)
admin.site.register(Activityfrequency)
admin.site.register(ActivityCategory)
admin.site.register(Task)
admin.site.register(Usertask)




class DepartmentAdmin(admin.ModelAdmin):
    model=Department
    fields=['dept_name','company',]
    list_display=('dept_name','company',)    
admin.site.register(Department,DepartmentAdmin,)

class CategoryTypeAdmin(admin.ModelAdmin):
    model=CategoryType
    fields=['category','categorytype','description',]
    list_display=('category','description','categorytype',)
admin.site.register(CategoryType,CategoryTypeAdmin)

class ActivityAdmin(admin.ModelAdmin):
    model=Activity
    fields=['name_of_activity','activity_description','activity_frequency','activity_category','category_reference','company','department','user',]
    list_display=('name_of_activity','activity_description','activity_frequency','activity_category','company','department','category_reference','user',) 
    

    # def get_queryset(self, request):
    #     qs = super().get_queryset(request)
    #     return qs.prefetch_related('activity_category')

    # def get_activity_category(self, obj):
    #     return ",".join([t.categoryname for t in obj.activity_category.all()])


 
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "department":
            kwargs["queryset"] = Department.objects.filter(company_id=1)
        return super(ActivityAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Activity,ActivityAdmin,)






