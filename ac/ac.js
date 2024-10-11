// Generate EFS
callsign = ["CPA", "CSN", "CSZ"];

level_SR = { "110": 0.01, "120": 0.29, "170": 0.05, "190": 0.1, "210": 0.1, "230": 0.2, "250": 0.2, "270": 0.05 };
level_LD = { "A090": 0.1, "F110": 0.9 };

dest_list = {
	"ENVAR": ["RCTP", "RCKH", "RJAA", "RJGG", "RJCC", "KSFO", "CYVR"],
	"NOMAN": ["RPLL", "RPLC", "YSSY"],
	"SABNO": ["WIII", "YPPH", "WBSB", "RPLL", "WAMM", "YMML"],
	"EPKAL": ["WSSS", "WADD", "WMKK"],
	"IKELA": ["VVDN", "VDPP", "VYYY", "VGHS"]
};

bay = {
	"SIERA" : "#bay_sr" 
}

flights = [];

const randomP = items => {
	const { min, random } = Math,
		commonMultiplier = 100,
		itemBox = []
	for (item in items) {
		for (let i = 0; i < items[item] * commonMultiplier; i++) {
			const randomPosition = 0 | random() * itemBox.length
			itemBox.splice(randomPosition, 0, item)
		}
	}
	return itemBox[0 | random() * itemBox.length]
}

function random(items) {
	return items[Math.floor(Math.random() * items.length)];
}





function genFlight(time) {
	out_fix = randomP({ "": 0.3, "ENVAR": 0.1, "NOMAN": 0.15, "SABNO": 0.15, "EPKAL": 0.15, "IKELA": 0.15 });

	if (out_fix === "") {
		dest = "VHHH";
		dep = randomP({ "ZGGG": 0.3, "ZGSZ": 0.1, "OMDB": 0.2, "ZGNN": 0.2, "ZKKK": 0.1, "ZMCK": 0.1 });
	} else {
		dest = random(dest_list[out_fix]);
		dep = randomP({ "ZGGG": 0.8, "ZGSZ": 0.2 });
	}

	if (dep === "ZGSZ") {
		fl = randomP({ "110": 0.1, "120": 0.9 });
	} else {
		if (dest === "VHHH") {
			fl = randomP({ "170": 0.1, "190": 0.2, "210": 0.3, "230": 0.3, "250": 0.1 });
		} else {
			fl = randomP({ "210": 0.1, "230": 0.3, "250": 0.5, "270": 0.1 });
		}
	}

	flight = {
		acid: random(callsign) + Math.floor(Math.random() * 10000),
		dep: dep,
		dest: dest,
		in_fix: "SIERA",
		out_fix: out_fix,
		fix_est: time,
		fl: fl,
		fl_light: "",
		acft: "A320",
		ssr: Math.floor(Math.random() * 7).toString() + Math.floor(Math.random() * 8).toString() + Math.floor(Math.random() * 8).toString() + Math.floor(Math.random() * 8).toString(),
		rvsm: "WR",
		rbox: "",
		f18: "",
		cloak: ""
	};

	flights.push(flight);
}



// Functions

function startExercise(num) {
	flights = [];

	times = [720];

	for (i = 0; i < num - 1; i++) {
		times.push(Number(times.slice(-1)) + Math.floor(Math.random() * 5) + 1);
	}

	//times = [1130,1135,1140,1145,1150,1155,1200,1205,1210,1215];

	times.forEach(element => {
		genFlight(element);
	});

	drawBoard("SIERA");
}

function cloak(acid, side, fix) {
	flights.find((o, i) => {
		if (o.acid === acid) {
			flights[i].cloak = side;
			return true; // stop searching
		}
	});
	drawBoard(fix);
}

function clickACID(acid) {
	if ($("#footer_acid").val() === acid){
		$("#footer_acid").val("");
	} else {
		$("#footer_acid").val(acid);
	}
}

function lightup(acid, fix) {
	flights.find((o, i) => {
		if (o.acid === acid) {
			switch (flights[i].fl_light) {
				case "":
					flights[i].fl_light = "bg-warning";
					break;
				case "bg-warning":
					flights[i].fl_light = "bg-danger";
					break;
				case "bg-danger":
					flights[i].fl_light = "";
					break;
			}
			return true; // stop searching
		}
	});
	drawBoard(fix);
}

function updateTransfer(closeModal){
	fix = "";
	const transferModal = $('#transferModal');
	const acidInput = $('#transferModal #acid').val();
	const timeInput = $('#transferModal #time').val();
	
	if (/(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]/.test(timeInput)) {
		$('#transferModal #time').removeClass("is-invalid");
		time = Number(timeInput.substr(0,2)) * 60 + Number(timeInput.substr(2,2));

		flights.find((o, i) => {
			if (o.acid === acidInput) {
				flights[i].fix_est = time;
				fix = flights[i].in_fix;
				return true; // stop searching
			}
		});

		drawBoard(fix);

		if (closeModal) {
			$('#transferModal').modal('hide');
		}
	} else {
		$('#transferModal #time').addClass("is-invalid");
	}
}

// Draw EFS

function showDOF(from, to) {
	// 🡸	🡹	🡺	🡻	🡼	🡽	🡾	🡿
	switch (from) {
		case "SIERA":
			switch (to) {
				case "":
					return "🡽";
				case "ENVAR":
					return "🡺";
				case "NOMAN":
					return "🡾";
				case "SABNO":
					return "🡾";
				case "EPKAL":
					return "🡻";
				case "IKELA":
					return "🡿";
			}
			break;
	}
}

function showTime(time) {
	return Math.floor(time / 60).toString().padStart(2, '0') + Math.floor(time % 60).toString().padStart(2, '0');
}

function drawCloak(fix, flight, efs) {
	efs_html = `<div class="row">`;
	if (flight.cloak === "") {
		efs_html += `<div class="col-1" onclick="cloak('${flight.acid}', 'L', '${fix}')"></div>`;
	} else if (flight.cloak === "R") {
		efs_html += `<div class="col-2" onclick="cloak('${flight.acid}', '', '${fix}')"></div>`;
	}

	efs_html += efs;

	if (flight.cloak === "") {
		efs_html += `<div class="col-1" onclick="cloak('${flight.acid}', 'R', '${fix}')"></div>`;
	} else if (flight.cloak === "L") {
		efs_html += `<div class="col-2" onclick="cloak('${flight.acid}', '', '${fix}')"></div>`;
	}
	efs_html += `</div>`;

	return efs_html;
}

function drawIB(fix, flight) {
	efs_html = `
        <div class="col-10">
            <div class="card border-info border-3 rounded-0">
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-3 border border-black fs-5" onclick="clickACID('${flight.acid}')">${flight.acid}</div>
                            <div class="col-2 border border-black fs-5 bg-opacity-50 ${flight.fl_light}" onclick="lightup('${flight.acid}', '${fix}')">${flight.fl}</div>
                            <div class="col-2 border border-black">${flight.in_fix}</div>
                            <div class="col-3 border border-black text-start">SIERA7A</div>
                            <div class="col-1 border border-black">${flight.f18}</div>
                            <div class="col-1 border border-black">${showDOF(flight.in_fix, flight.out_fix)}</div>
                        </div>
                        <div class="row">
                            <div class="col-1 border border-black">${flight.acft}</div>
                            <div class="col-1 border border-black"></div>
                            <div class="col-1 border border-black">${flight.ssr}</div>
                            <div class="col-2 border border-black">${flight.rvsm}</div>
                            <div class="col-2 border border-black">${showTime(flight.fix_est)}</div>
                            <div class="col-3 border border-black text-start">${flight.rbox}</div>
                            <div class="col-1 border border-black">${flight.dep}</div>
                            <div class="col-1 border border-black">R</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

	return drawCloak(fix, flight, efs_html);
}

function drawOVF(fix, flight) {
	efs_html = `
        <div class="col-10">
            <div class="card border-3 rounded-0" style="border-color: magenta;">
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-3 border border-black fs-5" onclick="clickACID('${flight.acid}')">${flight.acid}</div>
                            <div class="col-2 border border-black fs-5 bg-opacity-50 ${flight.fl_light}" onclick="lightup('${flight.acid}', '${fix}')">${flight.fl}</div>
                            <div class="col-2 border border-black">${flight.in_fix}</div>
                            <div class="col-2 border border-black text-start"></div>
                            <div class="col-1 border border-black">${flight.dep}</div>
                            <div class="col-1 border border-black">${flight.dest}</div>
                            <div class="col-1 border border-black" title="${flight.out_fix}">${showDOF(flight.in_fix, flight.out_fix)}</div>
                        </div>
                        <div class="row">
                            <div class="col-1 border border-black">${flight.acft}</div>
                            <div class="col-1 border border-black"></div>
                            <div class="col-1 border border-black">${flight.ssr}</div>
                            <div class="col-2 border border-black">${flight.rvsm}</div>
                            <div class="col-2 border border-black">${showTime(flight.fix_est)}</div>
                            <div class="col-4 border border-black text-start">${flight.rbox}</div>
                            <div class="col-1 border border-black">R</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
	return drawCloak(fix, flight, efs_html);

}


function drawBoard(fix) {
	flights.sort((a, b) => a.fix_est - b.fix_est);

	flight_draw = flights; //update select logic

	i = 0;
	efs_html = "";
	while (i < flight_draw.length) {
		if (flight_draw[i].dest === "VHHH") {
			efs_html += drawIB(fix, flight_draw[i]);
		} else {
			efs_html += drawOVF(fix, flight_draw[i]);
		}
		i++;
	}
	$(bay[fix]).html(efs_html);
}


$( document ).ready(function() {

	const transferModal = document.getElementById('transferModal');
	if (transferModal) {
		transferModal.addEventListener('show.bs.modal', event => {
			// Button that triggered the modal
			//const button = event.relatedTarget;
			// Extract info from data-bs-* attributes
			//const acid = button.getAttribute('data-bs-acid');
			acid = $("#footer_acid").val();

			flight = flights.find( (item) => (item.acid==acid) );
			ssr = flight?flight.ssr:"";
			time = flight?showTime(flight.fix_est):"";
			ftl = flight?flight.fl:"";
	
			$("#transferModal #transferModalLabel").html(`Update Transfer ${acid}`);
			$("#transferModal #acid").val(acid);
			$("#transferModal #ssr").val(ssr);
			$("#transferModal #time").val(time);
			if (ftl.length == 4){
				if (Number(ftl) > 270){
					$("#transferModal #ftl").val(`S${ftl}`);
				} else{
					$("#transferModal #ftl").val(`M${ftl}`);
				}
			} else if (ftl.length == 3){
				if (Number(ftl) > 90){
					$("#transferModal #ftl").val(`F${ftl}`);
				} else{
					$("#transferModal #ftl").val(`A${ftl}`);
				}
			} else {
				$("#transferModal #ftl").val(ftl);
			}
		})
	}

	var keyPressed = {};

	$(window).keydown(function(e) {
		keyPressed[e.which] = true;
	}).keyup(function(e) {
		keyPressed[e.which] = false;
	});

	$(window).keydown(function(e) {
		if (keyPressed[17] && keyPressed[120]) {
			$("#transferModal").modal('hide');
			if (!($('.modal.in').length)) {
				$('.modal-dialog').css({
					top: 300,
					left: 300
				});
			}
			$("#transferModal").modal('show');

			$('.modal-dialog').draggable({
			handle: ".modal-header"
			});
		}
	})


	$('.modal-dialog').draggable({
		"handle": ".modal-header"
	});
	
	$("#time").keyup(function () {
		if (this.value.length == this.maxLength) {
			$("#ftl").focus();
		}
	});

	startExercise(10);
});


//flights.push({acid: random(callsign), dep: "ZGGG", dest: "VHHH", in_fix: "SIERA", out_fix: "", fix_est: 1503, fl: "230", acft: "A320", ssr: "5201", rvsm: "WR", rbox: "CPA1235+16NM", f18: "014S", cloak: "L"});
//flights.push({acid: random(callsign), dep: "ZGGG", dest: "WMKK", in_fix: "SIERA", out_fix: "IKELA", fix_est: 1234, fl: "230", acft: "A320", ssr: "5201", rvsm: "WR", rbox: "CPA1235+16NM", f18: "014S", cloak: ""});
//flights.push({acid: random(callsign), dep: "ZGGG", dest: "VHHH", in_fix: "SIERA", out_fix: "", fix_est: 1424, fl: "230", acft: "A320", ssr: "5201", rvsm: "WR", rbox: "CPA1235+16NM", f18: "014S", cloak: "R"});


//flights.sort((a, b) => a.fix_est - b.fix_est)

//alert(flights[0].acid);

//drawBoard("#bay_sr", "SIERA");


