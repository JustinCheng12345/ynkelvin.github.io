keyPressed = {};

// Generate EFS
callsign = ["ABL", "AIQ", "APG", "AXM", "BAV", "BGB", "CAL", "CCA", "CHH", "CPA", "CQH", "CRK", "CSC", "CSN", "CSS", "CSZ", "CTJ", "CTV", "CXA", "EVA", "GIA", "GLP", "HGB", "HKC", "HKE", "HVN", "HZS", "JAL", "JCC", "JJA", "JNA", "KAL", "KME", "KMI", "KXP", "LHA", "LNI", "MGL", "MKR", "MYU", "NEP", "PAL", "QTR", "RBA", "RLH", "SJX", "SLK", "SWM", "TGW", "TTW", "TVJ", "UAE", "UPS", "WCM"];

//level_SR = { "110": 0.01, "120": 0.29, "170": 0.05, "190": 0.1, "210": 0.1, "230": 0.2, "250": 0.2, "270": 0.05 };
//level_LD = { "A090": 0.1, "F110": 0.9 };

level = {};
separation = [];
flow = [];
fatal = {};

dest_list = {
	"ENVAR": ["RCTP", "RCKH", "RJAA", "RJGG", "RJCC", "KSFO", "CYVR"],
	"KAPLI": ["RCTP", "RCKH", "RJAA", "RJGG", "RJCC", "KSFO", "CYVR"],
	"NOMAN": ["RPLL", "RPLC", "YSSY"],
	"SABNO": ["WIII", "YPPH", "WBSB", "RPLL", "WAMM", "YMML"],
	"EPKAL": ["WSSS", "WADD", "WMKK"],
	"IKELA": ["VVDN", "VVTS", "VDPP", "VYYY", "VGHS"],
	"SIKOU": ["VVTS"],
	"TAMOT": ["ZGGG"],
	"LANDA": ["ZGSZ"],
	"BEKOL": ["ZSPD", "ZSHC", "ZBAA", "ZBAD", "ZBTJ", "ZUUU", "ZGHA"],
	"DOTMI": ["ZSPD", "ZSSS", "ZSHC", "ZSNB", "ZSYW", "ZSAM", "ZGMX", "ZSQZ", "ZSFZ", "ZSWY", "ZSWZ", "ZSOF"]
};

traffic_dir = {
	"SIERA": "E",
	"ASOBA": "W",
	"DOSUT": "DSEK",
	"TAMOT": "W_m",
	"BEKOL": "E_m",
	"EPKAL": "DSEK",
	"IKELA_in": "E",
	"IKELA_out": "W",
	"SIKOU_in": "E_m",
	"SIKOU_out": "W_m"
}

flas = {
	"E": ["110", "130", "150", "170", "190", "210", "230", "250", "270", "290", "310", "330", "350", "370", "390", "410", "450"],
	"E_m": ["S0570", "S0630", "S0690", "S0750", "S0810", "S0890", "S0950", "S1010", "S1070", "S1130", "S1190", "S1250"],
	"W": ["120", "140", "160", "180", "200", "220", "240", "260", "280", "300", "320", "340", "360", "380", "400", "430"],
	"W_m": ["S0600", "S0660", "S0720", "S0780", "S0840", "S0920", "S0980", "S1040", "S1100", "S1160", "S1220"],
	"DSEK": ["270", "280", "310", "320", "350", "360", "390", "400"]
}

bay = {
	"SIERA" : "#bay_sr",
	"SIKOU" : "#bay_si",
	"IKELA" : "#bay_ik",
	"EPKAL" : "#bay_ek",
	"TAMOTBEKOL" : "#bay_tmbk",
	"DOSUTASOBA" : "#bay_dssb"
}

acft_list = ["B748", "B744", "B789", "B788", "B77W", "B773", "B77L", "B772", "B763", "B762", "B753", "B752", "B39M", "B38M", "B739", "B738", "B737", "B734", "A388", "A35K", "A359", "A346", "A343", "A333", "A332", "A306", "A21N", "A20N", "A321", "A320", "A319", "E190", "DC10", "MD11", "MD90", "GLF6", "GLF5", "GLEX", "GALX", "CL60"];

acft_m = {
	"B748" : [86], 
	"B744" : [86], 
	"B789" : [85], 
	"B788" : [85], 
	"B77W" : [84, 85], 
	"B773" : [84, 85], 
	"B77L" : [84, 85], 
	"B772" : [84, 85], 
	"B763" : [80, 81, 82, 83], 
	"B762" : [80, 81, 82, 83], 
	"B753" : [80, 81, 82], 
	"B752" : [80, 81, 82], 
	"B39M" : [79, 80], 
	"B38M" : [79, 80], 
	"B739" : [79, 80], 
	"B738" : [79, 80], 
	"B737" : [79, 80], 
	"B734" : [74, 75, 76, 77, 78], 
	"A388" : [85], 
	"A35K" : [85], 
	"A359" : [85], 
	"A346" : [83], 
	"A343" : [82], 
	"A333" : [82], 
	"A332" : [82], 
	"A306" : [79], 
	"A21N" : [78, 79], 
	"A20N" : [78, 79], 
	"A321" : [78, 79], 
	"A320" : [78, 79], 
	"A319" : [78, 79], 
	"E190" : [78], 
	"DC10" : [82], 
	"MD11" : [83], 
	"MD90" : [76], 
	"GLF6" : [85, 86, 87, 88, 89, 90], 
	"GLF5" : [80, 81, 82, 83, 84, 85], 
	"GLEX" : [85, 86, 87, 88], 
	"GALX" : [82], 
	"CL60" : [75]
};

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





function genFlight(fix, inout, time) {
	switch (fix) {
		case "SIERA":
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
			break;
		case "TAMOT":
			out_fix = randomP({ "ENVAR": 0.2, "NOMAN": 0.2, "SABNO": 0.2, "EPKAL": 0.2, "IKELA": 0.1, "SIKOU": 0.1 });

			dest = random(dest_list[out_fix]);

			dep = random(["ZSPD", "ZSHC", "ZBAA", "ZBAD", "ZBTJ", "ZUUU", "ZGHA"]);

			fl = randomP({ "S0840": 0.1, "S0920": 0.15, "S0980": 0.15, "S1040": 0.1, "S1100": 0.1, "S1160": 0.1, "S1220": 0.1, "S1130": 0.1, "S1250": 0.1 });
			break;
		
		case "BEKOL":
			break;

		case "DOSUT":
			out_fix = randomP({ "": 0.2, "DOTMI": 0.5, "SIKOU": 0.1, "BEKOL": 0.2 });

			if (out_fix === "") {
				dest = "VHHH";
			} else {
				dest = random(dest_list[out_fix]);
			}

			dep = random(["WIII", "WIHH", "WBSB", "WBGR", "WBGG", "WBGS", "WBKL", "WBGB"]);

			fl = randomP({ "310": 0.25, "320": 0.25, "340": 0.1, "350": 0.1, "360": 0.1, "390": 0.1, "400": 0.1 });
			break;

		case "ASOBA":
			out_fix = "";
			dest = "VHHH";
			dep = random(["WIII", "WIHH", "WBSB", "WBGR", "WBGG", "WBGS", "WBKL", "WBGB"]);

			fl = randomP({ "300": 0.4, "320": 0.1, "340": 0.1, "380": 0.4 });
			break;

		case "EPKAL":
			break;

		case "IKELA":
			if (inout === "in"){
				if (time <= 14 || time >= 975){
					out_fix = randomP({ "": 0.2, "DOTMI": 0.3, "ENVAR": 0.3, "KAPLI": 0.05, "BEKOL": 0.1, "LANDA": 0.05 });
				} else {
					out_fix = randomP({ "": 0.2, "DOTMI": 0.3, "ENVAR": 0.05, "KAPLI": 0.3, "BEKOL": 0.1, "LANDA": 0.05 });
				}
				if (out_fix === "") {
					dest = random(["VHHH", "VMMC"]);
				} else {
					dest = random(dest_list[out_fix]);
				}

				dep = random(["VVDN", "VVTS", "VDPP", "VYYY", "VGHS", "ZJSY"]);

				fl = randomP({ "290": 0.2, "330": 0.2, "370": 0.2, "410": 0.2, "350": 0.05, "390": 0.1, "270": 0.05 });
			} else {

			}
			break;
		case "SIKOU":
			if (inout === "in"){
				out_fix = randomP({ "": 0.4, "NOMAN": 0.15, "SABNO": 0.15, "BEKOL": 0.15, "KAPLI": 0.15 });

				if (out_fix === "") {
					dest = random(["VHHH", "VMMC"]);
				} else {
					dest = random(dest_list[out_fix]);
				}
	
				dep = random(["VTBS", "VTBD", "VTSP", "VIDP", "VVNB", "ZJSY", "ZJHK", "ZGZJ"]);
	
				if (dep === "ZJSY"){
					fl = randomP({ "S0810": 0.35, "S0890": 0.35, "S0840": 0.15, "S1010": 0.15 });					
				} else if (dep === "ZJHK" || dep === "ZGZJ"){
					fl = randomP({ "S0570": 0.6, "S0600": 0.2, "S0630": 0.2 });					
				} else {
					fl = randomP({ "S1010": 0.15, "S1070": 0.15, "S1130": 0.15, "S1190": 0.15, "S1250": 0.2, "S0950": 0.1, "S0890": 0.1 });					
				}
			}
			break;
	}

	acft_type = random(acft_list);

	field18 = "";

	if (["IKELA","EPKAL","DOSUT"].includes(fix)){
		field18 += randomP({ "W": 0.05, "": 0.95 });
		field18 += randomP({ "D": 0.05, "": 0.95 });
		field18 += randomP({ "0": 0.05, "": 0.95 });
	}

	flight = {
		acid: random(callsign) + Math.floor(Math.random() * 10000),
		dep: dep,
		dest: dest,
		in_fix: fix,
		out_fix: out_fix,
		fix_est: time,
		fl: fl,
		fl_light: "",
		acft: acft_type,
		speed: random(acft_m[acft_type]),
		ssr: Math.floor(Math.random() * 7).toString() + Math.floor(Math.random() * 8).toString() + Math.floor(Math.random() * 8).toString() + Math.floor(Math.random() * 8).toString(),
		rvsm: ((field18.indexOf('W') > -1)?"WN":"WR"),
		rbox: "",
		f18: field18,
		cloak: "",
		timepage: false
	};

	flights.push(flight);

}


// Functions

function resetRules(){
	if (exer === "ta"){
		// set rules
		level = {
			"SR_ZGSZ": ["120"],
			"SR_VHHH": ["190", "210", "230"],
			"SR_other": ["230", "250"]
		};

		separation = [
			{flow: false, both: true, dep: "ZGSZ", dep_not: "", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "", chase: false, sep: "20NM"},
			{flow: false, both: false, dep: "", dep_not: "ZGSZ", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", chase: false, sep: "16NM"},
			{flow: true, both: true, dep: "", dep_not: "ZGSZ", dest: "VHHH", dest_not: "", in_fix: "SIERA", out_fix: "", chase: false, sep: "5NM"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "VHHH", in_fix: "SIERA", out_fix: "", chase: false, sep: "30NM"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "ELATO", chase: false, sep: "10"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "ENVAR", chase: false, sep: "10"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "NOMAN", chase: false, sep: "10"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "SABNO", chase: false, sep: "10"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "EPKAL", chase: false, sep: "10"},
			{flow: false, both: true, dep: "", dep_not: "ZGSZ", dest: "", dest_not: "", in_fix: "SIERA", out_fix: "IKELA", chase: false, sep: "10"},

		];
	} else if (exer === "wa"){
		// set rules
		level = {
			"SB": ["300", "380"],
			"DS": ["270", "310", "320", "350", "360", "400"],
			"DS_390": ["270", "310", "320", "350", "360", "390", "400"],
			"DS_defi": ["270"],
			"TM": ["S0840", "S0920", "S0980", "S1040", "S1100", "S1160"],
			"IK_in": ["270", "290", "330", "370", "410"],
			"IK_in_390": ["270", "290", "330", "370", "390", "410"],
			"IK_defi": ["270"],
			"SI_in": ["S1010", "S1070", "S1130", "S1190"],
			"SI_in_ovf": ["S1010", "S1070", "S1130", "S1190", "S1250"],
			"SI_in_ZJSY": ["S0810", "S0890"],
			"SI_in_ZJHKZGZJ": ["S0570"]
		};

		separation = [
			//TAMOT
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "", chase: false, sep: "30NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "ENVAR", chase: false, sep: "50NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "NOMAN", chase: false, sep: "50NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "SABNO", chase: false, sep: "50NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "EPKAL", chase: false, sep: "50NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "IKELA", chase: false, sep: "50NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "TAMOT", out_fix: "SIKOU", chase: false, sep: "50NM"},
			//SIKOU
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "SIKOU", out_fix: "", chase: false, sep: "20NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "VHHH", dest_not: "", in_fix: "SIKOU", out_fix: "", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "VMMC", dest_not: "", in_fix: "SIKOU", out_fix: "", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "SIKOU", out_fix: "NOMAN", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "SIKOU", out_fix: "SABNO", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "SIKOU", out_fix: "BEKOL", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "SIKOU", out_fix: "KAPLI", chase: true, sep: "40NM"},
			{flow: true, both: true, dep: "ZJSY", dep_not: "", dest: "", dest_not: "VHHK", in_fix: "SIKOU", out_fix: "", chase: false, sep: "5"},
			//IKELA
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "IKELA", out_fix: "", chase: false, sep: "20NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "VHHH", dest_not: "", in_fix: "IKELA", out_fix: "", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "VMMC", dest_not: "", in_fix: "IKELA", out_fix: "", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "IKELA", out_fix: "DOTMI", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "IKELA", out_fix: "ENVAR", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "IKELA", out_fix: "KAPLI", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "IKELA", out_fix: "BEKOL", chase: true, sep: "40NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "IKELA", out_fix: "LANDA", chase: true, sep: "40NM"},
			{flow: true, both: true, dep: "ZJSY", dep_not: "", dest: "", dest_not: "VHHK", in_fix: "IKELA", out_fix: "", chase: false, sep: "5"},
			//ASOBA
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "ASOBA", out_fix: "", chase: true, sep: "10"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "ASOBA", out_fix: "", chase: false, sep: "MNT-"},
			//DOSUT
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "DOSUT", out_fix: "", chase: false, sep: "20NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "DOSUT", out_fix: "", chase: false, sep: "50NM"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "DOSUT", out_fix: "", chase: false, sep: "MNT-"},
			{flow: false, both: true, dep: "", dep_not: "", dest: "", dest_not: "", in_fix: "DOSUT", out_fix: "", chase: true, sep: "MNT+15"},

		];
	}
}

function generateFlow(){
	if (exer === "ta"){
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

			level["SR_other"] = ["250"];
		}
	}
}

function genFlightTime(fix, inout, initTime, timediff, num) {	
	times = [initTime + 15];

	for (i = 0; i < num - 1; i++) {
		times.push(Number(times.slice(-1)) + Math.floor(Math.random() * timediff) + 1);
	};

	times.forEach(element => {
		genFlight(fix, inout, element);
	});
}

function startExercise() {

	resetRules();

	generateFlow();

	flights = [];

	initTime = Math.floor(Math.random() * 1340);
	$("#clock").html(`<span class="fs-5">${showTime(initTime)}</span>00`)

	if (exer === "ta"){
		genFlightTime("SIERA", "in", initTime, 5, 10);

		drawBoard("SIERA");
	} else if (exer === "wa"){
		genFlightTime("ASOBA", "in", initTime, 10, 3);
		genFlightTime("DOSUT", "in", initTime, 3, 5);
		genFlightTime("TAMOT", "in", initTime, 3, 5);
		genFlightTime("IKELA", "in", initTime, 3, 10);
		genFlightTime("SIKOU", "in", initTime, 3, 10);

		drawBoard("DOSUTASOBA");
		drawBoard("TAMOTBEKOL");
		drawBoard("IKELA");
		drawBoard("SIKOU");
	}

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

function flip(acid, fix) {
	flights.find((o, i) => {
		if (o.acid === acid) {
			flights[i].timepage = !flights[i].timepage;

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

function isVHHK(ad) {
	return ( ad.startsWith("VH") || ad.startsWith("VM") );
}

function checkLevel(flight, traffic, traffic_flas) {
	fix = (flight.in_fix===""?flight.out_fix:flight.in_fix);
	if (!(fix in fatal)) 
		fatal[fix] = [];

	if (level[traffic].includes(flight.fl)){
		if (flight.fl_light === ""){
			return true;
		}
		fatal[fix].push(flight.acid + " level incorrect");
		return false;
	} 

	if (flas[traffic_dir[traffic_flas]].includes(flight.fl)){
		if (flight.fl_light === "bg-warning"){
			return true;
		}
		fatal[fix].push(flight.acid + " level incorrect");
		return false;
	} 

	if (flight.fl_light === "bg-danger"){
		return true;
	} 
	fatal[fix].push(flight.acid + " level incorrect");
	return false;

}

function checkSeparationApply(both, neg, field, data1, data2) {
	if (field === "") return true;
	if (neg) {
		if (both) {
			if (field === "MAINLAND"){
				return !isMainland(data1) && !isMainland(data2);
			} else if (field === "VHHK"){
				return !isVHHK(data1) && !isVHHK(data2);
			} else {
				return field !== data1 && field !== data2;
			}
		} else {
			if (field === "MAINLAND"){
				return !isMainland(data1) || !isMainland(data2);
			} else if (field === "VHHK"){
				return !isVHHK(data1) || !isVHHK(data2);
			} else {
				return field !== data1 || field !== data2;
			}
		}
	} else {
		if (both) {
			if (field === "MAINLAND"){
				return isMainland(data1) && isMainland(data2);
			} else if (field === "VHHK"){
				return isVHHK(data1) && isVHHK(data2);
			} else {
				return field === data1 && field === data2;
			}
		} else {
			if (field === "MAINLAND"){
				return isMainland(data1) || isMainland(data2);
			} else if (field === "MAINLAND"){
				return isVHHK(data1) || isVHHK(data2);
			} else {
				return field === data1 || field === data2;
			}
		}
	}
}


function checkSeparation(flight1, flight2) {
	const rules = separation.filter((r) => 
		(r.flow || flight1.fl === flight2.fl) && 
		(flight1.in_fix === flight2.in_fix) &&
		checkSeparationApply(r.both, false, r.dep, flight1.dep, flight2.dep) &&
		checkSeparationApply(r.both, true, r.dep_not, flight1.dep, flight2.dep) &&
		checkSeparationApply(r.both, false, r.dest, flight1.dest, flight2.dest) &&
		checkSeparationApply(r.both, true, r.dest_not, flight1.dest, flight2.dest) &&
		checkSeparationApply(r.both, false, r.in_fix, flight1.in_fix, flight2.in_fix) &&
		checkSeparationApply(r.both, false, r.out_fix, flight1.out_fix, flight2.out_fix) &&
		(!r.chase || (flight1.speed > flight2.speed && r.chase))
	);

	required = rules.map(d => d.sep);

	fix = (flight1.in_fix===""?flight1.out_fix:flight1.in_fix);
	if (!(fix in fatal)) 
		fatal[fix] = [];

	sep = 0;
	ensure = "";

	required.forEach(s => {
		if (fix === "DOSUT" || fix === "EPKAL"){
			if (s === "50NM"){
				if (flight1.fix_est >= 120 && flight1.fix_est <= 720 && 
					flight2.fix_est >= 120 && flight2.fix_est <= 720 && 
					Number(flight1.fl) >= 290 &&
					!flight1.f18.includes("D") && !flight2.f18.includes("D")){
						return;
					}
				if ((flight1.f18+flight2.f18).includes("D") &&
					(flight1.f18+flight2.f18).includes("0")){
					return;
				}
			}
			if (s === "MNT-"){
				if ((!flight1.f18.includes("D") && !flight2.f18.includes("D")) ||
				(!flight1.f18.includes("0") && !flight2.f18.includes("0"))){
					return;
				}
			}
		}

		if (s.endsWith("NM")){
			new_sep = Math.ceil(s.substr(0, s.length-2)/8);
			if (new_sep > sep){
				sep = new_sep;
				ensure = s;
			}
		} else {
			let new_sep;
			if (s === "MNT-") {
				new_sep = Math.min(Math.max(11-(flight2.speed-flight1.speed), 5),10);
			} else if (s === "MNT+15") {
				new_sep = Math.min(Math.max(10+flight1.speed-flight2.speed, 11),15);
			} else if (s === "MNT+") {
				new_sep = Math.max(10+flight1.speed-flight2.speed, 11);
			} else {
				new_sep = Number(s);
			}

			if (new_sep > sep){
				sep = new_sep;
				ensure = "";
			}
		}
	});
	
	if (flight1.fix_est-flight2.fix_est == sep && ensure !== ""){
		if (!flight1.rbox.includes(flight2.acid + "+" + s)){
			fatal[fix].push(flight1.acid + " & " + flight2.acid + " no ensure");
		}
	} else if (flight1.fix_est-flight2.fix_est < sep){
		fatal[fix].push(flight1.acid + " & " + flight2.acid + " not enough separation");
	}
	//console.log(flight1.acid, flight2.acid, rules.map(d => d.sep));
}

function checkAnswer() {
	fatal = {};

	flights.forEach(flight => {
		switch(flight.in_fix){
			case "SIERA":
				if (flight.dep === "ZGSZ") {
					checkLevel(flight, "SR_ZGSZ", "SIERA");
				} else if (flight.dest === "VHHH") {
					checkLevel(flight, "SR_VHHH", "SIERA");
				} else {
					checkLevel(flight, "SR_other", "SIERA");
				}
				break;
			case "ASOBA":
				checkLevel(flight, "SB", "ASOBA");
				break;
			case "DOSUT":
				if (flight.f18 !== ""){
					checkLevel(flight, "DS_defi", "DOSUT");
				} else if (flight.fix_est <= 960 || flight.fix_est >= 1381) {
					checkLevel(flight, "DS_390", "DOSUT");
				} else {
					checkLevel(flight, "DS", "DOSUT");
				}
				break;
			case "TAMOT":
				checkLevel(flight, "TM", "TAMOT");
				break;
			case "IKELA":
				if (flight.f18 !== ""){
					checkLevel(flight, "IK_defi", "IKELA_in");
				} else if ((flight.fix_est >= 961 && flight.fix_est <= 1380) || ["VHHH", "VMMC", "ZGSZ"].includes(flight.dest) || flight.out_fix === "BEKOL") {
					checkLevel(flight, "IK_in_390", "IKELA_in");
				} else {
					checkLevel(flight, "IK_in", "IKELA_in");
				}
				break;
			case "SIKOU":
				if (flight.dep === "ZJSY") {
					checkLevel(flight, "SI_in_ZJSY", "SIKOU_in");
				} else if (flight.dep === "ZJHK" || flight.dep === "ZGZJ") {
					checkLevel(flight, "SI_in_ZJHKZGZJ", "SIKOU_in");
				} else if (flight.dest === "VHHH" || flight.dest === "VMMC") {
					checkLevel(flight, "SI_in", "SIKOU_in");
				} else {
					checkLevel(flight, "SI_in_ovf", "SIKOU_in");
				}
				break;
		}
	});

	for (let i = 1; i < flights.length; i++) {
		for (let j = i-1; j >= 0; j--) {
			checkSeparation(flights[i], flights[j]);
		}
	}

	faultHTML = "";

	for(let fix in fatal){
		if (fatal[fix].length > 0){
			faultHTML += `<b>${fix}</b>`;
			fatal[fix].forEach(f => {
				faultHTML += `<li>${f}</li>`;
			});
		}
	}
 
	if (faultHTML === "") {
		faultHTML = `<h1>PASSSSSSSSSSSS</h1>`;
	}

	$("#faultList").html(faultHTML);


	$("#faultModal").modal('hide');
	if (!($('.modal.in').length)) {
		$('#faultModal .modal-dialog').css({
			top: 100,
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
		default: return "";
	}
}

function showTime(time) {
	return Math.floor(time / 60).toString().padStart(2, '0') + Math.floor(time % 60).toString().padStart(2, '0');
}

function showSTAR(fix, dest) {
	if (dest === "VHHH"){
		switch(fix) {
			case "SIERA": 
				return "SIERA7A";
			case "SIKOU":
			case "IKELA":
				return "CANTO3A";
			case "DOSUT":
			case "ASOBA":
				return "BETTY2A";
		}
	} else {
		switch(fix) {
			case "SIERA": 
			case "SIKOU":
			case "IKELA":
			case "DOSUT":
			case "ASOBA":
				return "CHALI4A";
		}
	}
}

function showLvl(fl){
	switch(fl){
		case "S1250": return "411";break;
		case "S1220": return "401";break;
		case "S1190": return "391";break;
		case "S1160": return "381";break;
		case "S1130": return "371";break;
		case "S1100": return "361";break;
		case "S1070": return "351";break;
		case "S1040": return "341";break;
		case "S1010": return "331";break;
		case "S0980": return "321";break;
		case "S0950": return "311";break;
		case "S0920": return "301";break;
		case "S0890": return "291";break;
		case "S0840": return "276";break;
		case "S0810": return "266";break;
		case "S0780": return "256";break;
		case "S0750": return "246";break;
		case "S0720": return "236";break;
		case "S0690": return "226";break;
		case "S0660": return "217";break;
		case "S0630": return "207";break;
		case "S0600": return "197";break;
		case "S0570": return "187";break;
		default: return fl;
	}
}

function showSpeed(fix, speed){
	if (["SIKOU", "IKELA", "EPKAL", "DOSUTASOBA"].includes(fix)){
		return "M"+speed+" ";
	}
	return "";
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
                            <div class="col-2 border border-black fs-5 bg-opacity-50 ${flight.fl_light}" onclick="lightup('${flight.acid}', '${fix}')">${showLvl(flight.fl)}</div>
                            <div class="col-2 border border-black">${flight.in_fix}</div>
                            <div class="col-3 border border-black text-start">${showSTAR(flight.in_fix, flight.dest)}</div>
                            <div class="col-1 border border-black">${flight.f18}</div>
                            <div class="col-1 border border-black">${showDOF(flight.in_fix, flight.out_fix)}</div>
                        </div>
                        <div class="row">
                            <div class="col-1 border border-black">${flight.acft}</div>
                            <div class="col-1 border border-black"></div>
                            <div class="col-1 border border-black">${flight.ssr}</div>
                            <div class="col-2 border border-black">${flight.rvsm}</div>
                            <div class="col-2 border border-black">${showTime(flight.fix_est)}</div>
                            <div class="col-3 border border-black text-start">${showSpeed(fix,flight.speed)}${flight.rbox}</div>
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

function drawOVF_TA(fix, flight) {
	efs_html = `
        <div class="col-10">
            <div class="card border-3 rounded-0" style="border-color: magenta;">
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-3 border border-black fs-5" onclick="clickACID('${flight.acid}')">${flight.acid}</div>
                            <div class="col-2 border border-black fs-5 bg-opacity-50 ${flight.fl_light}" onclick="lightup('${flight.acid}', '${fix}')">${showLvl(flight.fl)}</div>
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
                            <div class="col-4 border border-black text-start">${showSpeed(fix,flight.speed)}${flight.rbox}</div>
                            <div class="col-1 border border-black" onclick="openRbox('${flight.acid}')">R</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
	return drawCloak(fix, flight, efs_html);

}

function drawOVF_IN(fix, flight) {
	if (flight.timepage) {
		efs_html = `
			<div class="col-10">
				<div class="card border-3 rounded-0" style="border-color: magenta;">
					<div class="card-body">
						<div class="container">
							<div class="row">
								<div class="col-3 border border-black fs-5" onclick="clickACID('${flight.acid}')">${flight.acid}</div>
								<div class="col-2 border border-black fs-5 bg-opacity-50 ${flight.fl_light}" onclick="lightup('${flight.acid}', '${fix}')" oncontextmenu="flip('${flight.acid}', '${fix}');return false;">${showLvl(flight.fl)}</div>
								<div class="col-2 border border-black"></div>
								<div class="col-2 border border-black text-start"></div>
								<div class="col-1 border border-black"></div>
								<div class="col-1 border border-black"></div>
								<div class="col-1 border border-black">${showDOF(flight.in_fix, flight.out_fix)}</div>
							</div>
							<div class="row">
								<div class="col-1 border border-black">${flight.acft}</div>
								<div class="col-1 border border-black"></div>
								<div class="col-1 border border-black">${flight.ssr}</div>
								<div class="col-2 border border-black">${flight.rvsm}</div>
								<div class="col-2 border border-black text-info">${(flight.in_fix==='IKELA'&&(flight.out_fix==='ENVAR'||flight.out_fix==='KAPLI')?showTime(flight.fix_est+45):"")}</div>
								<div class="col-1 border border-black">${showTime(flight.fix_est)}</div>
								<div class="col-1 border border-black">${flight.dep}</div>
								<div class="col-1 border border-black">${flight.dest}</div>
								<div class="col-1 border border-black"></div>
								<div class="col-1 border border-black" onclick="openRbox('${flight.acid}')">R</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
	} else {
			efs_html = `
			<div class="col-10">
				<div class="card border-3 rounded-0" style="border-color: magenta;">
					<div class="card-body">
						<div class="container">
							<div class="row">
								<div class="col-3 border border-black fs-5" onclick="clickACID('${flight.acid}')">${flight.acid}</div>
								<div class="col-2 border border-black fs-5 bg-opacity-50 ${flight.fl_light}" onclick="lightup('${flight.acid}', '${fix}')" oncontextmenu="flip('${flight.acid}', '${fix}');return false;">${showLvl(flight.fl)}</div>
								<div class="col-2 border border-black">${flight.in_fix}</div>
								<div class="col-2 border border-black text-start"></div>
								<div class="col-1 border border-black">${flight.out_fix}</div>
								<div class="col-1 border border-black">${flight.f18}</div>
								<div class="col-1 border border-black">${showDOF(flight.in_fix, flight.out_fix)}</div>
							</div>
							<div class="row">
								<div class="col-1 border border-black">${flight.acft}</div>
								<div class="col-1 border border-black"></div>
								<div class="col-1 border border-black">${flight.ssr}</div>
								<div class="col-2 border border-black">${flight.rvsm}</div>
								<div class="col-2 border border-black">${showTime(flight.fix_est)}</div>
								<div class="col-3 border border-black text-start">${showSpeed(fix,flight.speed)}${flight.rbox}</div>
								<div class="col-1 border border-black">${flight.dest}</div>
								<div class="col-1 border border-black" onclick="openRbox('${flight.acid}')">R</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
	}
	return drawCloak(fix, flight, efs_html);

}

function drawBoard(fix) {
	if (fix === "TAMOT" || fix === "BEKOL"){
		fix = "TAMOTBEKOL";
	} else if (fix === "DOSUT" || fix === "ASOBA"){
		fix = "DOSUTASOBA";
	}

	flights.sort((a, b) => a.fix_est - b.fix_est);

	flight_draw = flights.filter((f) => 
		((fix.startsWith(f.in_fix) || fix.endsWith(f.in_fix)) || 
		((fix.startsWith(f.out_fix) || fix.endsWith(f.out_fix)) && f.in_fix === ""))
	); //update select logic

	i = 0;
	efs_html = "";
	if (exer === "ta") {
		while (i < flight_draw.length) {
			if (flight_draw[i].dest === "VHHH") {
				efs_html += drawIB(fix, flight_draw[i]);
			} else {
				efs_html += drawOVF_TA(fix, flight_draw[i]);
			}
			i++;
		}
	} else {
		while (i < flight_draw.length) {
			if (flight_draw[i].dest === "VHHH" || flight_draw[i].dest === "VMMC") {
				efs_html += drawIB(fix, flight_draw[i]);
			} else {
				efs_html += drawOVF_IN(fix, flight_draw[i]);
			}
			i++;
		}
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

});


//flights.push({acid: random(callsign), dep: "ZGGG", dest: "VHHH", in_fix: "SIERA", out_fix: "", fix_est: 1503, fl: "230", acft: "A320", ssr: "5201", rvsm: "WR", rbox: "CPA1235+16NM", f18: "014S", cloak: "L"});
//flights.push({acid: random(callsign), dep: "ZGGG", dest: "WMKK", in_fix: "SIERA", out_fix: "IKELA", fix_est: 1234, fl: "230", acft: "A320", ssr: "5201", rvsm: "WR", rbox: "CPA1235+16NM", f18: "014S", cloak: ""});
//flights.push({acid: random(callsign), dep: "ZGGG", dest: "VHHH", in_fix: "SIERA", out_fix: "", fix_est: 1424, fl: "230", acft: "A320", ssr: "5201", rvsm: "WR", rbox: "CPA1235+16NM", f18: "014S", cloak: "R"});


//flights.sort((a, b) => a.fix_est - b.fix_est)

//alert(flights[0].acid);

//drawBoard("#bay_sr", "SIERA");


