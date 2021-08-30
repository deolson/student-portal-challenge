FROM openjdk:11
ADD target/student-portal-final.jar     student-portal-final.jar
ENV 2108_EMAIL=""
ENV 2108_PASSWORD=""
EXPOSE 9010
ENTRYPOINT ["java","-jar","student-portal-final.jar"]