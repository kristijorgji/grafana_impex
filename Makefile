
rebuild-grafana:
	docker stop play-grafana && docker run --name play-grafana --rm -d -p 3000:3000 grafana/grafana:7.1.4
