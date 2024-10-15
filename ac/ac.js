keyPressed = {};

// Generate EFS
callsign = ["AIQ", "APG", "AXM", "BAV", "BGB", "CAL", "CCA", "CHH", "CPA", "CQH", "CRK", "CSC", "CSN", "CSS", "CSZ", "CTV", "CXA", "EVA", "GIA", "GLP", "HGB", "HKC", "HKE", "HVN", "HZS", "JAL", "JCC", "JJA", "JNA", "KAL", "KME", "KMI", "KXP", "LHA", "LNI", "MGL", "MKR", "MYU", "RLH", "SJX", "SLK", "SWM", "TTW", "TVJ", "UAE", "UPS", "WCM"];

//level_SR = { "110": 0.01, "120": 0.29, "170": 0.05, "190": 0.1, "210": 0.1, "230": 0.2, "250": 0.2, "270": 0.05 };
//level_LD = { "A090": 0.1, "F110": 0.9 };

level = {};
separation = [];
flow = [];
fatal = [];

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

function resetRules(){
	// set rules
	level = {
		"SR_ZGSZ": ["120"],
		"SR_VHHH": ["190", "210", "230"],
		"SR_other": ["230", "250"]
	};

	level_yellow = {
		"SR_ZGSZ": ["110"],
		"SR_VHHH": ["170", "250"],
		"SR_other": ["210", "270"]
	};

	separation = [
		{flow: false, both: true, dep: "ZGSZ", dep_not: "", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "", sep: "20NM"},
		//{flow: true, both: true, dep: "ZGSZ", dep_not: "", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", sep: "7"},
		//{flow: true, both: true, dep: "MAINLAND", dep_not: "", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", sep: "7"},
		{flow: false, both: false, dep: "", dep_not: "ZGSZ", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", sep: "16NM"},
		{flow: true, both: true, dep: "", dep_not: "ZGSZ", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", sep: "5NM"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "VHHH", in_fix: "SIERA", out_fix: "", sep: "30NM"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "ELATO", sep: "10"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "ENVAR", sep: "10"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "NOMAN", sep: "10"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "SABNO", sep: "10"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "EPKAL", sep: "10"},
		{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "IKELA", sep: "10"},

	];
}

function generateFlow(){
	nnsb = Math.random() >= 0.3;
	nnsb_sep = (Math.floor(Math.random() * 10) + 11).toString();

	ekik = Math.random() >= 0.3;
	ekik_sep = (Math.floor(Math.random() * 10) + 11).toString();

	ldg = Math.random() >= 0.3;
	ldg_sep = (Math.floor(Math.random() * 5) + 5).toString();

	flow = [
		{text: "SIERA - NOMAN", sep: nnsb_sep, cfs: "", validity:"UFN", remarks: "", active: nnsb},
		{text: "SIERA - SABNO", sep: nnsb_sep, cfs: "", validity:"UFN", remarks: "", active: nnsb},
		{text: "SIERA - EPKAL", sep: ekik_sep, cfs: "", validity:"UFN", remarks: "", active: ekik},
		{text: "SIERA - IKELA", sep: ekik_sep, cfs: "", validity:"UFN", remarks: "", active: ekik},
		{text: "SIERA DEP ZXXX LDG VHHH", sep: ldg_sep, cfs: "", validity:"UFN", remarks: "", active: ldg},
		{text: "SIERA LDG VHHH F190 N/A", sep: "", cfs: "", validity:"UFN", remarks: "", active: ldg},
		{text: "SIERA OVF VHHK F250 ONLY", sep: "", cfs: "", validity:"UFN", remarks: "", active: ldg},
	]

	if (nnsb) {
		separation.push({flow: true, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "NOMAN", sep: nnsb_sep});
		separation.push({flow: true, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "SABNO", sep: nnsb_sep});
		separation.push({flow: true, both: true, dep: "ZGSZ", dep_not: "", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "NOMAN", sep: nnsb_sep});
		separation.push({flow: true, both: true, dep: "ZGSZ", dep_not: "", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "SABNO", sep: nnsb_sep});
	}

	if (ekik) {
		separation.push({flow: true, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "EPKAL", sep: ekik_sep});
		separation.push({flow: true, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "IKELA", sep: ekik_sep});
		separation.push({flow: true, both: true, dep: "ZGSZ", dep_not: "", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "EPKAL", sep: ekik_sep});
		separation.push({flow: true, both: true, dep: "ZGSZ", dep_not: "", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "IKELA", sep: ekik_sep});
	}

	if (ldg) {
		separation.push({flow: true, both: true, dep: "MAINLAND", dep_not: "", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", sep: ldg_sep});
		separation.push({flow: true, both: true, dep: "ZGSZ", dep_not: "", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", sep: ldg_sep});

		level["SR_VHHH"] = ["210", "230"];
		level_yellow["SR_VHHH"].push("190");

		level["SR_other"] = ["250"];
		level_yellow["SR_other"].push("230");
	}


}

function startExercise(num) {

	resetRules();

	generateFlow();

	flights = [];

	initTime = Math.floor(Math.random() * 1340);
	$("#clock").html(`<span class="fs-5">${showTime(initTime)}</span>00`)

	times = [initTime + 15];

	for (i = 0; i < num - 1; i++) {
		times.push(Number(times.slice(-1)) + Math.floor(Math.random() * 5) + 1);
	};

	times.forEach(element => {
		genFlight(element);
	});

	drawBoard("SIERA");

	showFlow();
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

function openTransfer() {
	$("#transferModal").modal('hide');
	if (!($('.modal.in').length)) {
		$('#transferModal .modal-dialog').css({
			top: 600,
			left: 300
		});
	}
	$("#transferModal").modal('show');

	$('.modal-dialog').draggable({
	handle: ".modal-header"
	});

	$("#footer_acid").val("");
}

function openRbox(acid) {

	flight = flights.find( (item) => (item.acid==acid) );
	rbox = flight?flight.rbox:"";

	$("#rboxModal #rboxModalLabel").html(`Annotation - ${acid}`);
	$("#rboxModal #acid").val(acid);
	$("#rboxModal #rbox").val(rbox);

	$("#rboxModal").modal('hide');
	if (!($('.modal.in').length)) {
		$('#rboxModal .modal-dialog').css({
			top: 300,
			left: 1000
		});
	}
	$("#rboxModal").modal('show');

	$('.modal-dialog').draggable({
	handle: ".modal-header"
	});
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

function updateTransfer(closeModal) {
	fix = "";
	const transferModal = $('#transferModal');
	const acidInput = $('#transferModal #acid').val();
	const timeInput = $('#transferModal #time').val();
	const ftlInput = $('#transferModal #ftl').val();
	
	if (/(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]/.test(timeInput)) {
		$('#transferModal #time').removeClass("is-invalid");
		time = Number(timeInput.substr(0,2)) * 60 + Number(timeInput.substr(2,2));
		ftl = ftlInput.replace("F", "");

		flights.find((o, i) => {
			if (o.acid === acidInput) {
				flights[i].fix_est = time;
				flights[i].fl = ftl;
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

function updateRbox(closeModal) {
	fix = "";
	const rboxModal = $('#rboxModal');
	const acidInput = $('#rboxModal #acid').val();
	const rboxInput = $('#rboxModal #rbox').val();
	
	flights.find((o, i) => {
		if (o.acid === acidInput) {
			flights[i].rbox = rboxInput;
			fix = flights[i].in_fix;
			return true; // stop searching
		}
	});

	drawBoard(fix);

	if (closeModal) {
		$('#rboxModal').modal('hide');
	}
}

function isMainland(ad) {
	return ( ad.startsWith("Z") && !ad.startsWith("ZK") && !ad.startsWith("ZM") && !ad.startsWith("ZGSZ") );
}

function checkLevel(flight, traffic) {
	if (level[traffic].includes(flight.fl)){
		if (flight.fl_light === ""){
			return true;
		}
		fatal.push(flight.acid + " level incorrect");
		return false;
	} 

	if (level_yellow[traffic].includes(flight.fl)){
		if (flight.fl_light === "bg-warning"){
			return true;
		}
		fatal.push(flight.acid + " level incorrect");
		return false;
	} 

	if (flight.fl_light === "bg-danger"){
		return true;
	} 
	fatal.push(flight.acid + " level incorrect");
	return false;

}

function checkSeparationApply(both, neg, field, data1, data2) {
	if (field === "") return true;
	if (neg) {
		if (both) {
			if (field === "MAINLAND"){
				return !isMainland(data1) && !isMainland(data2);
			} else {
				return field !== data1 && field !== data2;
			}
		} else {
			if (field === "MAINLAND"){
				return !isMainland(data1) || !isMainland(data2);
			} else {
				return field !== data1 || field !== data2;
			}
		}
	} else {
		if (both) {
			if (field === "MAINLAND"){
				return isMainland(data1) && isMainland(data2);
			} else {
				return field === data1 && field === data2;
			}
		} else {
			if (field === "MAINLAND"){
				return isMainland(data1) || isMainland(data2);
			} else {
				return field === data1 || field === data2;
			}
		}
	}
}


function checkSeparation(flight1, flight2) {
	const rules = separation.filter((r) => 
		(r.flow || flight1.fl === flight2.fl) && 
		checkSeparationApply(r.both, false, r.dep, flight1.dep, flight2.dep) &&
		checkSeparationApply(r.both, true, r.dep_not, flight1.dep, flight2.dep) &&
		checkSeparationApply(r.both, false, r.dest, flight1.dest, flight2.dest) &&
		checkSeparationApply(r.both, true, r.dest_not, flight1.dest, flight2.dest) &&
		checkSeparationApply(r.both, false, r.in_fix, flight1.in_fix, flight2.in_fix) &&
		checkSeparationApply(r.both, false, r.out_fix, flight1.out_fix, flight2.out_fix)
	);

	required = rules.map(d => d.sep);

	required.forEach(s => {
		if (s.endsWith("NM")){
			sep = Math.ceil(s.substr(0, s.length-2)/8);
			if (flight1.fix_est-flight2.fix_est == sep){
				if (flight1.rbox !== flight2.acid + "+" + s){
					fatal.push(flight1.acid + " & " + flight2.acid + " no ensure");
				}
			} else if (flight1.fix_est-flight2.fix_est < sep){
				fatal.push(flight1.acid + " & " + flight2.acid + " not enough separation");
			}
		} else {
			sep = Number(s);
			if (flight1.fix_est-flight2.fix_est < sep){
				fatal.push(flight1.acid + " & " + flight2.acid + " not enough separation");
			}
		}

	});
	
	//console.log(flight1.acid, flight2.acid, rules.map(d => d.sep));
}

function checkAnswer() {
	fatal = [];

	flights.forEach(flight => {
		if (flight.in_fix === "SIERA") {
			if (flight.dep === "ZGSZ") {
				checkLevel(flight, "SR_ZGSZ");
			} else if (flight.dest === "VHHH") {
				checkLevel(flight, "SR_VHHH");
			} else {
				checkLevel(flight, "SR_other");
			}
		}
	});

	for (let i = 1; i < flights.length; i++) {
		for (let j = i-1; j >= 0; j--) {
			//if ((flights[i].in_fix === "SIERA" && flights[i].fl === "270") || (flights[j].in_fix === "SIERA" && flights[j].fl === "270")) continue;
			checkSeparation(flights[i], flights[j]);
		}
	}

	faultHTML = ""

	fatal.forEach(f => {
		//console.log(f);
		faultHTML += `<li>${f}</li>`;
	});

	if (faultHTML === "") {
		faultHTML = `<li>PASSSSSSSSSSSS</li>`;
	}

	$("#faultList").html(faultHTML);


	$("#faultModal").modal('hide');
	if (!($('.modal.in').length)) {
		$('#faultModal .modal-dialog').css({
			top: 500,
			left: 300
		});
	}
	$("#faultModal").modal('show');

	$('.modal-dialog').draggable({
	handle: ".modal-header"
	});
}

function showFlow() {
	flowHTML = ""
	flow.forEach(f => {
		if (f.active){
			flowHTML += `
				<tr>
					<td>${f.text}</td>
					<td>${f.sep}</td>
					<td>${f.cfs}</td>
					<td>${f.validity}</td>
					<td>${f.remarks}</td>
				</tr>`;
		}
	});

	if (flowHTML === ""){
		flowHTML = `
			<tr>
				<td>Nil</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>`;
	}

	$("#flowModal tbody").html(flowHTML);


	$("#flowModal").modal('hide');
	if (!($('.modal.in').length)) {
		$('#flowModal .modal-dialog').css({
			top: 50,
			left: 10
		});
	}
	$("#flowModal").modal('show');

	$('.modal-dialog').draggable({
	handle: ".modal-header"
	});
}
// Draw EFS

function getOS() {
	const userAgent = window.navigator.userAgent;
	const platform =
	  window.navigator?.userAgentData?.platform || window.navigator.platform;
	const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K", "macOS"];
	const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
	const iosPlatforms = ["iPhone", "iPad", "iPod"];
  
	if (macosPlatforms.indexOf(platform) !== -1) {
	  os = "Mac OS";
	} else if (iosPlatforms.indexOf(platform) !== -1) {
	  os = "iOS";
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
	  os = "Windows";
	} else if (/Android/.test(userAgent)) {
	  os = "Android";
	} else if (/Linux/.test(platform)) {
	  os = "Linux";
	}
  
	return os;
  }  

function showDOF(from, to) {
	// 							
	if (getOS() === "Mac OS" || getOS() === "Android"){
		w = "←";
		n = "↑";
		e = "→";
		s = "↓";
		nw = "↖";
		ne = "↗";
		se = "↘";
		sw = "↙";
	} else {
		w = "🡸";
		n = "🡹";
		e = "🡺";
		s = "🡻";
		nw = "🡼";
		ne = "🡽";
		se = "🡾";
		sw = "🡿";
	}
	
	switch (from) {
		case "SIERA":
			switch (to) {
				case "":
					return ne;
				case "ENVAR":
					return e;
				case "NOMAN":
					return se;
				case "SABNO":
					return se;
				case "EPKAL":
					return s;
				case "IKELA":
					return sw;
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
                            <div class="col-1 border border-black" onclick="openRbox('${flight.acid}')">R</div>
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
                            <div class="col-1 border border-black" onclick="openRbox('${flight.acid}')">R</div>
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
		});
		
	}

	const rboxModal = document.getElementById('rboxModal');
	if (rboxModal) {
		rboxModal.addEventListener('show.bs.modal', event => {
			// Button that triggered the modal
			//const button = event.relatedTarget;
			// Extract info from data-bs-* attributes
			//const acid = button.getAttribute('data-bs-acid');

		});
		
	}

	$(window).keydown(function(e) {
		keyPressed[e.which] = true;
	}).keyup(function(e) {
		keyPressed[e.which] = false;
	});

	$(window).keydown(function(e) {
		if (keyPressed[17] && keyPressed[120]) {
			keyPressed = {};
			
			openTransfer();
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


