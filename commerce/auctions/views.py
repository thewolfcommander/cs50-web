from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.forms import ModelForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

from .models import User, Listing, Bid, Comment

class NewListingForm(ModelForm):
    class Meta:
        model = Listing
        fields = ['title', 'description', 'price', 'image', 'category']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_action = 'create'
        self.helper.label_class = 'col-lg-2'
        self.helper.field_class = 'col-lg-8'
        self.helper.add_input(Submit('submit', 'Submit'))


class NewCommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.label_class = 'col-lg-2'
        self.helper.field_class = 'col-lg-8'
        self.helper.add_input(Submit('submit', 'Submit'))


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.all(),
        "home_page": True
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


@login_required
def create(request):
    if request.method == "POST":
        form = NewListingForm(request.POST)

        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]
            price = form.cleaned_data["price"]
            image = form.cleaned_data["image"]
            category = form.cleaned_data["category"]

            listing = Listing(creator=request.user, title=title, description=description, price=price, image=image, category=category)
            listing.save()
            return HttpResponseRedirect(reverse("index"))
        
        else:
            return render(request, "auctions/create.html", {
                "listing_form": form
            })

    return render(request, "auctions/create.html", {
        "listing_form": NewListingForm()
    })


def listing(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    comments = Comment.objects.filter(listing=listing)

    # Validate and save comment if request method is POST
    if request.method =="POST":
        form = NewCommentForm(request.POST)

        if form.is_valid():
            content = form.cleaned_data["content"]
            comment = Comment(listing=listing, commenter=request.user, content=content)
            comment.save()
            return HttpResponseRedirect(reverse("listing", args=(listing.id,)))

        else:
            return render(request, "auctions/listing.html", {
                "listing": listing,
                "comments": comments,
                "comment_form": form
            })

    # Render listing page if request method is GET
    return render(request, "auctions/listing.html", {
        "listing": listing,
        "comments": comments,
        "comment_form": NewCommentForm()
    })


def categories(request):
    categories = Listing.objects.order_by('category').values_list('category', flat=True).distinct()
    categories = [category.capitalize() for category in categories if category is not None]
    return render(request, "auctions/categories.html", {
        "categories": categories
    })


def category_listings(request, category):
    return render(request, "auctions/index.html", {
        "category": category,
        "listings": Listing.objects.filter(category=category.upper()),
        "home_page": False
    })