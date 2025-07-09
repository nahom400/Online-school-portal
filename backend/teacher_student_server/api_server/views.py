from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from .serializers import GroupSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API
    This provides the concise better way to implement POST and GET at the same time!

    Both to  view and edit !
    it may be that we call something like 
    UserViewSet.create
    UserViewSet.read
    UserViewSet.update
    UserViewSet.delete

    in our python function definitions: to connect them to the url paths

    Edit: we actually have a submodule in rest_framework called router which handles every thing without us writing a single line of url!!!!

    if you want more control over the urls you can revert back to using regular clas based views, then writing the url confs explicitly

    we write the url rest_framework_routing to the main urls.py file instead of the app
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
class GroupViewSet(viewsets.ModelViewSet):

    """
    Same story here
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]