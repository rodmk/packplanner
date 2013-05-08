from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User

class Family(models.Model):
	last_name = models.CharField(max_length=40)
	address_line_1 = models.CharField(max_length=200)
	address_line_2 = models.CharField(max_length=200)
	address_city = models.CharField(max_length=100)
	address_state = models.CharField(max_length=50)
	address_zip_code = models.IntegerField(null=True)
	phone_number = models.IntegerField(null=True)
	contacts = models.ManyToManyField("self")

	def __unicode__(self):
		return u'%s Family' % (self.last_name)
		
	def familyAddress(self):
		return u'%s\\n%s\\n%s, %s %d' % (self.address_line_1, self.address_line_2, self.address_city, self.address_state, self.address_zip_code)

	def familyPhone(self):
		return u'%d' % (self.phone_number)

	def childrenList(self):
		display = ""
		first = True
		for child in self.children.all():
			if not first:
				display += ", "
			else:
				first = False
			display += child.first_name
		return display

	def parentList(self):
		display = ""
		first = True
		for parent in self.family_members.all():
			if not first:
				display += ", "
			else:
				first = False
			display += parent.first_name
		return display

	def displayFamilyNames(self):
		display = self.last_name + ", "
		first = True
		for adult in self.family_members.all():
			if not first:
				display += " and "
			else:
				first = False
			display += adult.first_name
		return display

class FamilyForm(ModelForm):
	class Meta:
		model = Family
		exclude = ("contacts",)

class Child(models.Model):
	family = models.ForeignKey(Family, related_name="children")
	first_name = models.CharField(max_length=40)
	is_driver = models.BooleanField()

	def __unicode__(self):
		return u'%s %s' % (self.first_name, self.family.last_name)

class FamilyMember(models.Model):
	user = models.OneToOneField(User, related_name="user_account", null=True)
	first_name = models.CharField(max_length=40)
	last_name = models.CharField(max_length=40)
	date_of_birth = models.DateField()
	timestamp = models.DateTimeField() # TODO: nuke this field sometime
	family = models.ForeignKey(Family, related_name="family_members")
	is_adult = models.BooleanField()
	is_driver = models.BooleanField()

	def __unicode__(self):
		return u'%s %s' % (self.first_name, self.last_name)

class FamilyMemberForm(ModelForm):
	class Meta:
		model = FamilyMember
		exclude = ("user", "timestamp", "family")

class Schedule(models.Model):
	name = models.CharField(max_length=100)
	description=models.TextField()
	timestamp = models.DateTimeField()
	creator = models.ForeignKey(User, related_name="creator")

	def __unicode__(self):
		return u'%s' % (self.name,)

class FamilyScheduleDetails(models.Model):
	schedule = models.ForeignKey(Schedule, related_name="users_schedule_details")
	family = models.ForeignKey(Family, related_name="family_schedules_details")
	attendees = models.ManyToManyField(FamilyMember, related_name="attending_schedule_details")
	child_attendees = models.ManyToManyField(Child, related_name="attending_schedule_details")
	notes = models.TextField()

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
	child_attendees = models.ManyToManyField(Child, related_name="attending_event_details")
	driverTo = models.ForeignKey(User, related_name="driving_responsibilites_to")
	driverFrom = models.ForeignKey(User, related_name="driving_responsibilites_from")

	def __unicode__(self):
		return u'Details for %s Event for the %s' % (self.event, self.family)

class Message(models.Model):
	sender = models.ForeignKey(Family, related_name="sent_messages")
	receiver = models.ForeignKey(Family, related_name="received_messages")
	in_inbox = models.BooleanField()
	message = models.TextField()
	subject = models.CharField(max_length=200)
	time_sent = models.DateTimeField()

	def __unicode__(self):
		return u'"%s" from %s to %s' % (self.subject, self.sender, self.receiver)
