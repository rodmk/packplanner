from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, Http404
from pack.models import *
from django.shortcuts import *
from django.utils import simplejson
import datetime
from dateutil import tz

@login_required
def index(request):
	return HttpResponseRedirect('/calendar/')

@login_required
def calendar(request):
	family_member = get_family_member(request.user)
	if request.method == 'POST':
		name = request.POST['event[title]']
		location = request.POST['event[location]']
		start_time = request.POST['start_time']
		start_time = datetime.datetime.fromtimestamp(float(start_time)/1000.0, tz.gettz('America/New_York'))
		end_time = request.POST['end_time']
		end_time = datetime.datetime.fromtimestamp(float(end_time)/1000.0, tz.gettz('America/New_York'))
		driver_from_id = request.POST['event[driverFrom]']
		driver_to_id = request.POST['event[driverTo]']
		creator = request.user
		children_going = request.POST.getlist('event[childrengoingID][]')
		adults_going = request.POST.getlist('event[adultsgoingID][]')

		schedule = Schedule.objects.all()[0]
		event = Event(name=name, description=" ", location=location, timestamp=datetime.datetime.now(tz.gettz('America/New_York')), 
			creator=creator, startTime=start_time, endTime=end_time, schedule=schedule)
		event.save()

		if not driver_to_id == -1:
			driverTo = User.objects.get(id=driver_to_id)
		else :
			driverTo = User.objects.get(id=7)

		if not driver_from_id == -1:
			driverFrom = User.objects.get(id=driver_from_id)
		else :
			driverFrom = User.objects.get(id=7)

		events_details = FamilyEventDetails(event=event, family=family_member.family, 
			notes=" ", driverTo=driverTo, driverFrom=driverFrom)
		events_details.save()

		for child_id in children_going:
			child = Child.objects.get(id=child_id)
		  	events_details.child_attendees.add(child)

		for adult_id in adults_going:
			adult = FamilyMember.objects.get(id=adult_id)
		  	events_details.attendees.add(adult)
		  	
		id = events_details.id

		return HttpResponse(simplejson.dumps(id))

	events_details = FamilyEventDetails.objects.filter(family=family_member.family)
	return render(request, 'index.html', {"events_details" : events_details, "family" : family_member.family})

@login_required
def contacts(request):
	family_member = get_family_member(request.user)
	# if request.method == 'POST':
	# 	family = family_member.family
	# 	requested_contact_ids = request.POST['requested_contact_ids']
	# 	requested_contact_ids = requested_contact_ids.split(" ");
	# 	for requested_contact_id in requested_contact_ids:
	# 		id = (int) requested_contact_id
	# 		requested_contact = Family.objects.get(id=id)
	# 		ContactRequest contact_request = new ContactRequest(family, requested_contact)
	# 		contact_request.save()
	contacts = family_member.family.contacts.all()
	contact_requests = family_member.family.contact_requests.all()
	return render(request, 'contacts.html', {"contacts" : contacts, "contact_requests" : contact_requests})

@login_required
def inbox(request):
	family_member = get_family_member(request.user)
	messages = family_member.family.received_messages.filter(in_inbox=True)
	return render(request, 'inbox.html', {"messages" : messages})

@login_required
def schedules(request):
	family_member = get_family_member(request.user)
	schedules_details = FamilyScheduleDetails.objects.filter(family=family_member.family)
	return render(request, 'schedules.html', {"schedules_details" : schedules_details})

@login_required
def settings(request):
	family_member = get_family_member(request.user)
	if request.method == 'POST':
		if request.POST['form-type'] == u"personal-form":
		   form = FamilyMemberForm(request.POST, instance=family_member)
		elif request.POST['form-type'] == u"family-form":
		   form = FamilyForm(request.POST, instance=family_member.family)

		if form.is_valid():
			form.save()

	return render(
		request, 
		'settings.html', 
		{
			"user": get_family_member(request.user),
			"pform": FamilyMemberForm(instance=family_member), 
			"fform": FamilyForm(instance=family_member.family)
		}
	)

@login_required
def view_contact(request, id):
	return render(request, 'view-contact.html', {})

@login_required
def view_message(request, id):
	message = Message.objects.get(id=id)
	family_member = get_family_member(request.user)
	return render(request, 'view-message.html', {"message" : message})

@login_required
def view_schedule(request, id):
	family_member = get_family_member(request.user)
	schedule = Schedule.objects.get(id=id)
	return render(request, 'view-schedule.html', {"schedule" : schedule})

def get_family_member(user):
	family_member = user.user_account
	return family_member

@login_required
def edit_event(request, id):
	family_member = get_family_member(request.user)
	if request.method == 'POST':
		print request.POST
		event = Event.objects.get(id=id)

		if event.creator == request.user:
			name = request.POST['event[title]']
			location = request.POST['event[location]']
			start_time = request.POST['event[startDate]']
			# start_time = datetime.datetime.fromtimestamp(start_time)
			print start_time
			end_time = request.POST['event[endDate]']
			print end_time

		if event in family_member.family.family_events_details:
			driver_from_id = request.POST['event[driverFrom]']
			# driver_to_id = request.POST['event[driverTo]']
			# creator = request.user
			# children_going = request.POST['event[childrengoingID]']
			# print childrengoingID
			# adults_going = request.POST['event[adultsdoingID]']
			# print adults_going

		# Schedule schedule = Schedule.objects.all()[0]
		# Event event = new Event(name, "", location, datetime.now(), creator, start_time, end_time, schedule)
		# event.save()
		# FamilyEventDetails events_details = new FamilyEventDetails(event=event, family=family_member.family, notes="")
		# events_details.save()

		# if not driver_to_id == -1 :
		#   	events_details.driverTo = User.objects.get(id=driver_to_id)
		#   	events_details.save()

		# if not driver_from_id == -1:
		#   	events_details.driverFrom = driver_from
		#   	events_details.save()

		# for child_id in children_going:
		# 	child = Child.objects.get(id=child_id)
		#   	events_details.child_attendees.add(child)

		# for adult_id in adults_going:
		# 	adult = Adult.objects.get(adult_id)
		#   	events_details.attendees.add(adult)
		# id = events_details.id
		id=0
		return HttpResponse(simplejson.dumps(id))