from django.shortcuts import render
from django import forms
from django.http import HttpResponseRedirect
from django.core.exceptions import ValidationError
import random
import markdown2

from . import util

# Form for search bar
class SearchBar(forms.Form):
    q = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Search Encyclopedia', 'class': 'search'}))


# Form to create a new page
class NewPageForm(forms.Form):
    title = forms.CharField(label="Page Title")
    content = forms.CharField(widget=forms.Textarea, label="Markdown Content")

    # Custom validation - raise error if entry with same name already exists
    def clean_title(self):
        title = self.cleaned_data["title"]
        if title.lower() in [entry.lower() for entry in util.list_entries()]:
            raise ValidationError("An entry already exists with the same title!")
        return title


# Form to edit an existing page
class EditPageForm(forms.Form):
    # title = forms.CharField(widget=forms.HiddenInput())
    content = forms.CharField(widget=forms.Textarea, label="Markdown Content")


# Respond to search input
def search(request):
    form = SearchBar(request.POST)
    if form.is_valid():
        q = form.cleaned_data["q"].lower()
        
        # Exact match - redirect to entry
        if q in [entry.lower() for entry in util.list_entries()]:
            return HttpResponseRedirect(q)

        # No exact match - list all substring matches
        search_results = [entry for entry in util.list_entries() if q in entry.lower()]
        return render(request, "encyclopedia/index.html", {
            "entries": search_results,
            "search_form": SearchBar(),
            "home": False
        })


# Render home page
def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "search_form": SearchBar(),
        "home": True
    })


# Render wiki entries
def entry(request, title):
    try:
        md_content = markdown2.markdown(util.get_entry(title))
    except:
        md_content = None

    return render(request, "encyclopedia/entry.html", {
        "title": title.lower(),
        "entry": md_content,
        "search_form": SearchBar()
    })


# Render random wiki entry
def lucky(request):
    page = random.choice(util.list_entries())
    return HttpResponseRedirect(page)


# Render page to create new wiki entry
def new(request):
    if request.method == "POST":
        form = NewPageForm(request.POST)

        # Check if form data is valid (server-side)
        if form.is_valid():
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]

            # Save new entry to disk
            util.save_entry(title, content)

            # Redirect to new entry's page
            return HttpResponseRedirect(title)
        
        else:
            # If form is invalid, re-render page with existing information
            return render(request, "encyclopedia/form.html", {
                "page_form": form,
                "search_form": SearchBar(),
                "new_page": True
            })

    return render(request, "encyclopedia/form.html", {
        "page_form": NewPageForm(),
        "search_form": SearchBar(),
        "new_page": True
    })


# Render page to edit existing entry
def edit(request, title):
    if request.method == "POST":
        form = EditPageForm(request.POST)

        # Check if form data is valid (server-side)
        if form.is_valid():
            content = form.cleaned_data["content"]

            # Save new entry to disk
            util.save_entry(title, content)

            # Redirect to new entry's page
            return HttpResponseRedirect(f"/wiki/{title}")
        
        else:
            # If form is invalid, re-render page with existing information
            return render(request, "encyclopedia/form.html", {
                "page_form": form,
                "search_form": SearchBar(),
                "title": title,
                "new_page": False
            })

    return render(request, "encyclopedia/form.html", {
        "page_form": EditPageForm(initial={'title': title, 'content': util.get_entry(title)}),
        "search_form": SearchBar(),
        "title": title,
        "new_page": False
    })
