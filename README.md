# GPS-Sim
A simple REST based NodeJS Server for simulating GPS clients/emitters. Upload your CSV file with GPS co-ordinates, set time interval, configure port and start simulating away.

This is a NodeJS web applicaiton that you can quickly spin up, upload trajectory and start emitting RESTful POSTs to your application server that consumes termporal GPS data. Use this app to simulate a moving vechile or any trajectory that needs to be simulated.

I recommed nmeagen.org for generating your trajectory file.

# IMPORTANT
During the first full fledged version 1.0.0 this application will be containerized using Docker. One needs to simply to pull and run the Dockerimage. The entire application will be configured to open up the dasboard on the default browser automatically.

Please do send in your suggestions, features that you want to see in this applicaiton to make your development process easy.

## INSTRUCTIONS
1) Upload your GPS trajectory file named as trajectory.csv or configure to your own convenience in the NodeJS file
2) Set the URL and Interval parameters
3) Start trajectory to test your application or server.

## FURTHER DEVELOPMENTS
This project is currently in its "alpha" version 0.1.2. Please feel free to use it and provide me with any improvements and features that you might want added to make it more easy to simulate REST based GPS trajectories. 

The actual production version 1.0.0 will hopefully contain the following features :
1) User can pload multiple trajectory files and choose them on the go
2) User can add jitter to the interval
3) User can view REST call response log in real time in the web UI
4) Start multiple simultaneous trajectory simulations
