from django.db import models
from django.contrib.auth.models import User

class Family(models.Model):
	last_name = models.CharField(max_length=40)
	# address = models.CharField(max_length=200)

	def __unicode__(self):
		return u'%s Family' % (self.last_name,)

class FamilyMember(models.Model):
	user = models.ForeignKey(User, related_name="user_account", null=True)
	first_name = models.CharField(max_length=40)
	last_name = models.CharField(max_length=40)
	date_of_birth = models.DateField()
	timestamp = models.DateTimeField()
	family = models.ForeignKey(Family, related_name="family_members")
	is_adult = models.BooleanField()
	is_driver = models.BooleanField()

	def __unicode__(self):
		return u'%s %s' % (self.first_name, self.last_name)

class Schedule(models.Model):
	name = models.CharField(max_length=100)
	description=models.TextField()
	timestamp = models.DateTimeField()
	creator = models.ForeignKey(User, related_name="creator")
	subscribers = models.ManyToManyField(Family, related_name="schedules")

	def __unicode__(self):
		return u'%s' % (self.name,)

class FamilyScheduleDetails(models.Model):
	schedule = models.ForeignKey(Schedule, related_name="users_schedule_details")
	family = models.ForeignKey(Family, related_name="family_schedules_details")
	attendees = models.ForeignKey(FamilyMember, related_name="attending_schedule_details")
	# notes = models.TextField()

	def __unicode__(self):
		return u'Details for %s Schedule for the %s' % (self.schedule, self.family)

class Event(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	location = models.CharField(max_length=50)
	timestamp = models.DateTimeField()
	creator = models.ForeignKey(User, related_name="created_events")
	startTime = models.DateTimeField()
	endTime = models.DateTimeField()
	schedule = models.ForeignKey(Schedule, related_name="events")

	def __unicode__(self):
		return u'%s' % (self.name,)

class FamilyEventDetails(models.Model):
	event = models.ForeignKey(Event, related_name="users_event_details")
	family = models.ForeignKey(Family, related_name="family_events_details")
	notes = models.CharField(max_length=1000)
	attendees = models.ManyToManyField(FamilyMember, related_name="attending_events_details")
	driverTo = models.ForeignKey(User, related_name="driving_responsibilites_to")
	driverFrom = models.ForeignKey(User, related_name="driving_responsibilites_from")

	def __unicode__(self):
		return u'Details for %s Event for the %s' % (self.event, self.family)