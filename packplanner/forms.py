from django import forms
from pack.models import Event, FamilyEventDetails, Schedule, FamilyMember, Family
from django.contrib.auth.models import User

class FamilyMemberForm(forms.ModelForm):
	class Meta:
		model = FamilyMember
		exclude = ("user", "last_name", "timestamp", "family", "is_adult", "is_driver")
	def __init__(self, *args, **kwargs):
		super(FamilyMemberForm, self).__init__(*args, **kwargs)
		for field in self.fields.values():
			field.widget.attrs['class'] = "familyMemberFormField"

class FamilyForm(forms.ModelForm):
	class Meta:
		model = Family
		exclude = ("contacts",)
	def __init__(self, *args, **kwargs):
		super(FamilyForm, self).__init__(*args, **kwargs)
		for field in self.fields.values():
			field.widget.attrs['class'] = "familyFormField"

class EventForm(forms.Form):
	name = forms.CharField(max_length=100)
	description = forms.CharField(required=False)
	location = forms.CharField(max_length=50)
	startTime = forms.DateTimeField()
	endTime = forms.DateTimeField()
	schedule = forms.ModelChoiceField(Schedule.objects.all(), required=False)

	# def __init__(self, *args, **kwargs):
	# 	super(EventForm, self).__init__(*args, **kwargs)

	# 	print "self.fields ", self.fields
	# 	print "args ", args
	# 	print "kwargs ", kwargs
	# 	user =  args[1]
		#self.fields["creator"] = forms.ModelChoiceField(User.objects.all())
	# class Meta:
	# 	model = Event
	# 	fields = ("name", "location", "startTime", "endTime")

class EventDetailsForm(forms.ModelForm):

	class Meta:
		model = FamilyEventDetails
		fields = ("event", "family", "attendees", "child_attendees", "driverTo", "driverFrom")