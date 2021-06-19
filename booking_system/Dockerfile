FROM python:3.9.1-alpine
RUN apk update && apk upgrade
RUN apk add gcc linux-headers musl-dev build-base g++
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]