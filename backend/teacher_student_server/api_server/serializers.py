from rest_framework import serializers
from .models import Teacher, Student
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['username','first_name','last_name','section','teachers_assigned_to','subjects']

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['username','first_name','last_name','inbox']



# the difference between ModelSerializer and HyperlinkedModelSerializer

# Notice that we're using hyperlinked relations in this case with HyperlinkedModelSerializer. You can also use primary key and various other relationships, but hyperlinking is good RESTful design.