FROM python:3.10-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /django

RUN apt-get update

RUN apt-get install python3-dev default-libmysqlclient-dev gcc -y

COPY req.txt requirements.txt 

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . .



