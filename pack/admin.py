from django.contrib import admin
from pack.models import *

admin.site.register(Family)
admin.site.register(Child)
admin.site.register(FamilyMember)
admin.site.register(Schedule)
admin.site.register(FamilyScheduleDetails)
admin.site.register(Event)
admin.site.register(FamilyEventDetails)
admin.site.register(Message)
admin.site.register(ContactRequest)