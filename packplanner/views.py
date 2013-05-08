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

		event_details = FamilyEventDetails(event=event, family=family_member.family, notes=" ")
		event_details.save()

		try:
			driverTo = User.objects.get(id=driver_to_id)
			event_details.driverTo = driverTo
			event_details.save()
		except Exception, e:
			pass

		try:
			driverFrom = User.objects.get(id=driver_from_id)
			event_details.driverFrom = driverFrom
			event_details.save()
		except Exception, e:
			pass

		for child_id in children_going:
			try:
				child = Child.objects.get(id=child_id)
			  	event_details.child_attendees.add(child)
			except Exception, e:
				pass

		for adult_id in adults_going:
		  	try:
				adult = FamilyMember.objects.get(id=adult_id)
		  		event_details.attendees.add(adult)
			except Exception, e:
				pass
		  	
		  	
		id = event_details.id

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
	return render(request, 'contacts.html', {"contacts" : contacts, "contact_requests" : contact_requests, "family" : family_member.family})

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

		event_details = FamilyEventDetails.objects.get(id=id)
		event = event_details.event
		event.name=name
		event.description=description
		event.location=location
		event.start_time=start_time
		event.end_time=end_time
		event.save()

		try:
			driverTo = User.objects.get(id=driver_to_id)
			event_details.driverTo = driverTo
			event_details.save()
		except Exception, e:
			pass

		try:
			driverFrom = User.objects.get(id=driver_from_id)
			event_details.driverFrom = driverFrom
			event_details.save()
		except Exception, e:
			pass

		for child_id in children_going:
			try:
				child = Child.objects.get(id=child_id)
			  	event_details.child_attendees.add(child)
			except Exception, e:
				pass

		for adult_id in adults_going:
		  	try:
				adult = FamilyMember.objects.get(id=adult_id)
		  		event_details.attendees.add(adult)
			except Exception, e:
				pass
		  	
		id = event_details.id

		return HttpResponse(simplejson.dumps(id))

@login_required
def remove_event(request, id):
	family_member = get_family_member(request.user)
	if request.method == 'POST':
		print request.POST
		event_details = FamilyEventDetails.objects.get(id=id)
		if family_member.family == event_details.family:
			event_details.delete()
			return HttpResponse(simplejson.dumps(1))
		else:
			return HttpResponse(simplejson.dumps(-1))
	else:
		return HttpResponseRedirect("/home/")