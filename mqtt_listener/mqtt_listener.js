const mqtt = require("mqtt")
const jwt = require('jsonwebtoken');
const os = require("os")
const fs = require('fs');
const { exec } = require("child_process")

const host = "172.20.0.2"
const port = "1883"
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const topic = os.hostname()

const connectionUrl = `mqtt://${host}:${port}`

const cert = fs.readFileSync('./cert.pem');
console.log(`Loaded wallet  certificate: ${cert}`)

const client = mqtt.connect(connectionUrl, {
	clientId,
	clean:true,
	connectionTimeout: 4000,
	reconnectionPeriod: 1000
})


function verifyJWT(cert, token) {
        return new Promise((resolve, reject) => {
                jwt.verify(token, cert, function(err, decoded) {
                        if(err) {
                                reject(err);
                        }
                        resolve(decoded);
                });
        });
}

client.on('connect', () => {
	console.log('Connected')
	client.subscribe([topic], () => {
		console.log(`Subscribed to ${topic}`)
	})
	client.on('message', (topic, payload) => {
		console.log('Received message: ', topic, payload.toString())
		verifyJWT(cert, payload.toString()).then(j => {
			//const data = JSON.parse(payload);
			const data = j.payload
			console.log(data)
			console.log(data.cmd)
			console.log(data.cmdParams)
			const cmd = data.cmd.replace('$cmdParam', data.cmdParams);
			console.log(cmd)

			exec(cmd, (error, stdout, stderr) => {
				if(error) {
					console.log(`error: ${error}`)
					return
				}
				if(stderr) {
					console.log(`stderr: ${stderr}`)
					return
				}
				console.log(`stdout: ${stdout}`)
			})
		})
	})
})
