// Departamentos, provincias y distritos del Perú
// Fuente: INEI (Instituto Nacional de Estadística e Informática) - UBIGEO
// 25 departamentos/regiones, 196 provincias, 1874 distritos
const DEPARTAMENTOS = [
  {
    id: "Amazonas",
    name: "Amazonas",
    provincias: [
      {
        id: "Chachapoyas",
        name: "Chachapoyas",
        distritos: ["Chachapoyas", "Asunción", "Balsas", "Cheto", "Chiliquin", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba", "Levanto", "Magdalena", "Mariscal Castilla", "Molinopampa", "Montevideo", "Olleros", "Quinjalca", "San Francisco de Daguas", "San Isidro de Maino", "Soloco", "Sonche"]
      },
      {
        id: "Bagua",
        name: "Bagua",
        distritos: ["Bagua", "Aramango", "Copallin", "El Parco", "Imaza", "La Peca"]
      },
      {
        id: "Bongará",
        name: "Bongará",
        distritos: ["Jumbilla", "Chisquilla", "Churuja", "Corosha", "Cuispes", "Florida", "Jazan", "Recta", "San Carlos", "Shipasbamba", "Valera", "Yambrasbamba"]
      },
      {
        id: "Condorcanqui",
        name: "Condorcanqui",
        distritos: ["Nieva", "El Cenepa", "Rio Santiago"]
      },
      {
        id: "Luya",
        name: "Luya",
        distritos: ["Lamud", "Camporredondo", "Cocabamba", "Colcamar", "Conila", "Inguilpata", "Longuita", "Lonya Chico", "Luya", "Luya Viejo", "Maria", "Ocalli", "Ocumal", "Pisuquia", "Providencia", "San Cristóbal", "San Francisco del Yeso", "San Jerónimo", "San Juan de Lopecancha", "Santa Catalina", "Santo Tomas", "Tingo", "Trita"]
      },
      {
        id: "Rodríguez de Mendoza",
        name: "Rodríguez de Mendoza",
        distritos: ["San Nicolas", "Chirimoto", "Cochamal", "Huambo", "Limabamba", "Longar", "Mariscal Benavides", "Milpuc", "Omia", "Santa Rosa", "Totora", "Vista Alegre"]
      },
      {
        id: "Utcubamba",
        name: "Utcubamba",
        distritos: ["Bagua Grande", "Cajaruro", "Cumba", "El Milagro", "Jamalca", "Lonya Grande", "Yamon"]
      }
    ]
  },
  {
    id: "Áncash",
    name: "Áncash",
    provincias: [
      {
        id: "Huaraz",
        name: "Huaraz",
        distritos: ["Huaraz", "Cochabamba", "Colcabamba", "Huanchay", "Independencia", "Jangas", "La Libertad", "Olleros", "Pampas", "Pariacoto", "Pira", "Tarica"]
      },
      {
        id: "Aija",
        name: "Aija",
        distritos: ["Aija", "Coris", "Huacllan", "La Merced", "Succha"]
      },
      {
        id: "Antonio Raymondi",
        name: "Antonio Raymondi",
        distritos: ["Llamellin", "Aczo", "Chaccho", "Chingas", "Mirgas", "San Juan de Rontoy"]
      },
      {
        id: "Asunción",
        name: "Asunción",
        distritos: ["Chacas", "Acochaca"]
      },
      {
        id: "Bolognesi",
        name: "Bolognesi",
        distritos: ["Chiquian", "Abelardo Pardo Lezameta", "Antonio Raymondi", "Aquia", "Cajacay", "Canis", "Colquioc", "Huallanca", "Huasta", "Huayllacayan", "La Primavera", "Mangas", "Pacllon", "San Miguel de Corpanqui", "Ticllos"]
      },
      {
        id: "Carhuaz",
        name: "Carhuaz",
        distritos: ["Carhuaz", "Acopampa", "Amashca", "Anta", "Ataquero", "Marcara", "Pariahuanca", "San Miguel de Aco", "Shilla", "Tinco", "Yungar"]
      },
      {
        id: "Carlos Fermín Fitzcarral",
        name: "Carlos Fermín Fitzcarral",
        distritos: ["San Luis", "San Nicolas", "Yauya"]
      },
      {
        id: "Casma",
        name: "Casma",
        distritos: ["Casma", "Buena Vista Alta", "Comandante Noel", "Yautan"]
      },
      {
        id: "Corongo",
        name: "Corongo",
        distritos: ["Corongo", "Aco", "Bambas", "Cusca", "La Pampa", "Yanac", "Yupan"]
      },
      {
        id: "Huari",
        name: "Huari",
        distritos: ["Huari", "Anra", "Cajay", "Chavin de Huantar", "Huacachi", "Huacchis", "Huachis", "Huantar", "Masin", "Paucas", "Ponto", "Rahuapampa", "Rapayan", "San Marcos", "San Pedro de Chana", "Uco"]
      },
      {
        id: "Huarmey",
        name: "Huarmey",
        distritos: ["Huarmey", "Cochapeti", "Culebras", "Huayan", "Malvas"]
      },
      {
        id: "Huaylas",
        name: "Huaylas",
        distritos: ["Caraz", "Huallanca", "Huata", "Huaylas", "Mato", "Pamparomas", "Pueblo Libre", "Santa Cruz", "Santo Toribio", "Yuracmarca"]
      },
      {
        id: "Mariscal Luzuriaga",
        name: "Mariscal Luzuriaga",
        distritos: ["Piscobamba", "Casca", "Eleazar Guzmán Barron", "Fidel Olivas Escudero", "Llama", "Llumpa", "Lucma", "Musga"]
      },
      {
        id: "Ocros",
        name: "Ocros",
        distritos: ["Ocros", "Acas", "Cajamarquilla", "Carhuapampa", "Cochas", "Congas", "Llipa", "San Cristóbal de Rajan", "San Pedro", "Santiago de Chilcas"]
      },
      {
        id: "Pallasca",
        name: "Pallasca",
        distritos: ["Cabana", "Bolognesi", "Conchucos", "Huacaschuque", "Huandoval", "Lacabamba", "Llapo", "Pallasca", "Pampas", "Santa Rosa", "Tauca"]
      },
      {
        id: "Pomabamba",
        name: "Pomabamba",
        distritos: ["Pomabamba", "Huayllan", "Parobamba", "Quinuabamba"]
      },
      {
        id: "Recuay",
        name: "Recuay",
        distritos: ["Recuay", "Catac", "Cotaparaco", "Huayllapampa", "Llacllin", "Marca", "Pampas Chico", "Pararin", "Tapacocha", "Ticapampa"]
      },
      {
        id: "Santa",
        name: "Santa",
        distritos: ["Chimbote", "Cáceres del Perú", "Coishco", "Macate", "Moro", "Nepeña", "Samanco", "Santa", "Nuevo Chimbote"]
      },
      {
        id: "Sihuas",
        name: "Sihuas",
        distritos: ["Sihuas", "Acobamba", "Alfonso Ugarte", "Cashapampa", "Chingalpo", "Huayllabamba", "Quiches", "Ragash", "San Juan", "Sicsibamba"]
      },
      {
        id: "Yungay",
        name: "Yungay",
        distritos: ["Yungay", "Cascapara", "Mancos", "Matacoto", "Quillo", "Ranrahirca", "Shupluy", "Yanama"]
      }
    ]
  },
  {
    id: "Apurímac",
    name: "Apurímac",
    provincias: [
      {
        id: "Abancay",
        name: "Abancay",
        distritos: ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama", "Pichirhua", "San Pedro de Cachora", "Tamburco"]
      },
      {
        id: "Andahuaylas",
        name: "Andahuaylas",
        distritos: ["Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Huayana", "Kishuara", "Pacobamba", "Pacucha", "Pampachiri", "Pomacocha", "San Antonio de Cachi", "San Jerónimo", "San Miguel de Chaccrampa", "Santa Maria de Chicmo", "Talavera", "Tumay Huaraca", "Turpo", "Kaquiabamba", "José María Arguedas"]
      },
      {
        id: "Antabamba",
        name: "Antabamba",
        distritos: ["Antabamba", "El Oro", "Huaquirca", "Juan Espinoza Medrano", "Oropesa", "Pachaconas", "Sabaino"]
      },
      {
        id: "Aymaraes",
        name: "Aymaraes",
        distritos: ["Chalhuanca", "Capaya", "Caraybamba", "Chapimarca", "Colcabamba", "Cotaruse", "Huayllo", "Justo Apu Sahuaraura", "Lucre", "Pocohuanca", "San Juan de Chacña", "Sañayca", "Soraya", "Tapairihua", "Tintay", "Toraya", "Yanaca"]
      },
      {
        id: "Cotabambas",
        name: "Cotabambas",
        distritos: ["Tambobamba", "Cotabambas", "Coyllurqui", "Haquira", "Mara", "Challhuahuacho"]
      },
      {
        id: "Chincheros",
        name: "Chincheros",
        distritos: ["Chincheros", "Anco Huallo", "Cocharcas", "Huaccana", "Ocobamba", "Ongoy", "Uranmarca", "Ranracancha", "Rocchacc", "El Porvenir", "Los Chankas"]
      },
      {
        id: "Grau",
        name: "Grau",
        distritos: ["Chuquibambilla", "Curpahuasi", "Gamarra", "Huayllati", "Mamara", "Micaela Bastidas", "Pataypampa", "Progreso", "San Antonio", "Santa Rosa", "Turpay", "Vilcabamba", "Virundo", "Curasco"]
      }
    ]
  },
  {
    id: "Arequipa",
    name: "Arequipa",
    provincias: [
      {
        id: "Arequipa",
        name: "Arequipa",
        distritos: ["Arequipa", "Alto Selva Alegre", "Cayma", "Cerro Colorado", "Characato", "Chiguata", "Jacobo Hunter", "La Joya", "Mariano Melgar", "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandia", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas", "Santa Rita de Siguas", "Socabaya", "Tiabaya", "Uchumayo", "Vitor", "Yanahuara", "Yarabamba", "Yura", "Jose Luis Bustamante y Rivero"]
      },
      {
        id: "Camaná",
        name: "Camaná",
        distritos: ["Camaná", "Jose Maria Quimper", "Mariano Nicolas Valcárcel", "Mariscal Cáceres", "Nicolas de Pierola", "Ocoña", "Quilca", "Samuel Pastor"]
      },
      {
        id: "Caravelí",
        name: "Caravelí",
        distritos: ["Caravelí", "Acarí", "Atico", "Atiquipa", "Bella Union", "Cahuacho", "Chala", "Chaparra", "Huanuhuanu", "Jaqui", "Lomas", "Quicacha", "Yauca"]
      },
      {
        id: "Castilla",
        name: "Castilla",
        distritos: ["Aplao", "Andagua", "Ayo", "Chachas", "Chilcaymarca", "Choco", "Huancarqui", "Machaguay", "Orcopampa", "Pampacolca", "Tipan", "Uñon", "Uraca", "Viraco"]
      },
      {
        id: "Caylloma",
        name: "Caylloma",
        distritos: ["Chivay", "Achoma", "Cabanaconde", "Callalli", "Caylloma", "Coporaque", "Huambo", "Huanca", "Ichupampa", "Lari", "Lluta", "Maca", "Madrigal", "San Antonio de Chuca", "Sibayo", "Tapay", "Tisco", "Tuti", "Yanque", "Majes"]
      },
      {
        id: "Condesuyos",
        name: "Condesuyos",
        distritos: ["Chuquibamba", "Andaray", "Cayarani", "Chichas", "Iray", "Rio Grande", "Salamanca", "Yanaquihua"]
      },
      {
        id: "Islay",
        name: "Islay",
        distritos: ["Mollendo", "Cocachacra", "Dean Valdivia", "Islay", "Mejia", "Punta de Bombón"]
      },
      {
        id: "La Union",
        name: "La Union",
        distritos: ["Cotahuasi", "Alca", "Charcana", "Huaynacotas", "Pampamarca", "Puyca", "Quechualla", "Sayla", "Tauria", "Tomepampa", "Toro"]
      }
    ]
  },
  {
    id: "Ayacucho",
    name: "Ayacucho",
    provincias: [
      {
        id: "Huamanga",
        name: "Huamanga",
        distritos: ["Ayacucho", "Acocro", "Acos Vinchos", "Carmen Alto", "Chiara", "Ocros", "Pacaycasa", "Quinua", "San Jose de Ticllas", "San Juan Bautista", "Santiago de Pischa", "Socos", "Tambillo", "Vinchos", "Jesus Nazareno", "Andrés Avelino Cáceres Dorregaray"]
      },
      {
        id: "Cangallo",
        name: "Cangallo",
        distritos: ["Cangallo", "Chuschi", "Los Morochucos", "Maria Parado de Bellido", "Paras", "Totos"]
      },
      {
        id: "Huanca Sancos",
        name: "Huanca Sancos",
        distritos: ["Sancos", "Carapo", "Sacsamarca", "Santiago de Lucanamarca"]
      },
      {
        id: "Huanta",
        name: "Huanta",
        distritos: ["Huanta", "Ayahuanco", "Huamanguilla", "Iguain", "Luricocha", "Santillana", "Sivia", "Llochegua", "Canayre", "Uchuraccay", "Pucacolpa", "Chaca"]
      },
      {
        id: "La Mar",
        name: "La Mar",
        distritos: ["San Miguel", "Anco", "Ayna", "Chilcas", "Chungui", "Luis Carranza", "Santa Rosa", "Tambo", "Samugari", "Anchihuay", "Oronccoy"]
      },
      {
        id: "Lucanas",
        name: "Lucanas",
        distritos: ["Puquio", "Aucara", "Cabana", "Carmen Salcedo", "Chaviña", "Chipao", "Huac-Huas", "Laramate", "Leoncio Prado", "Llauta", "Lucanas", "Ocaña", "Otoca", "Saisa", "San Cristóbal", "San Juan", "San Pedro", "San Pedro de Palco", "Sancos", "Santa Ana de Huaycahuacho", "Santa Lucia"]
      },
      {
        id: "Parinacochas",
        name: "Parinacochas",
        distritos: ["Coracora", "Chumpi", "Coronel Castañeda", "Pacapausa", "Pullo", "Puyusca", "San Francisco de Ravacayco", "Upahuacho"]
      },
      {
        id: "Paucar del Sara Sara",
        name: "Paucar del Sara Sara",
        distritos: ["Pausa", "Colta", "Corculla", "Lampa", "Marcabamba", "Oyolo", "Pararca", "San Javier de Alpabamba", "San Jose de Ushua", "Sara Sara"]
      },
      {
        id: "Sucre",
        name: "Sucre",
        distritos: ["Querobamba", "Belén", "Chalcos", "Chilcayoc", "Huacaña", "Morcolla", "Paico", "San Pedro de Larcay", "San Salvador de Quije", "Santiago de Paucaray", "Soras"]
      },
      {
        id: "Victor Fajardo",
        name: "Victor Fajardo",
        distritos: ["Huancapi", "Alcamenca", "Apongo", "Asquipata", "Canaria", "Cayara", "Colca", "Huamanquiquia", "Huancaraylla", "Huaya", "Sarhua", "Vilcanchos"]
      },
      {
        id: "Vilcas Huaman",
        name: "Vilcas Huaman",
        distritos: ["Vilcas Huaman", "Accomarca", "Carhuanca", "Concepcion", "Huambalpa", "Independencia", "Saurama", "Vischongo"]
      }
    ]
  },
  {
    id: "Cajamarca",
    name: "Cajamarca",
    provincias: [
      {
        id: "Cajamarca",
        name: "Cajamarca",
        distritos: ["Cajamarca", "Asunción", "Chetilla", "Cospan", "Encañada", "Jesus", "Llacanora", "Los Baños del Inca", "Magdalena", "Matara", "Namora", "San Juan"]
      },
      {
        id: "Cajabamba",
        name: "Cajabamba",
        distritos: ["Cajabamba", "Cachachi", "Condebamba", "Sitacocha"]
      },
      {
        id: "Celendín",
        name: "Celendín",
        distritos: ["Celendín", "Chumuch", "Cortegana", "Huasmin", "Jorge Chávez", "Jose Gálvez", "Miguel Iglesias", "Oxamarca", "Sorochuco", "Sucre", "Utco", "La Libertad de Pallan"]
      },
      {
        id: "Chota",
        name: "Chota",
        distritos: ["Chota", "Anguia", "Chadin", "Chiguirip", "Chimban", "Choropampa", "Cochabamba", "Conchan", "Huambos", "Lajas", "Llama", "Miracosta", "Paccha", "Pion", "Querocoto", "San Juan de Licupis", "Tacabamba", "Tocmoche", "Chalamarca"]
      },
      {
        id: "Contumaza",
        name: "Contumaza",
        distritos: ["Contumaza", "Chilete", "Cupisnique", "Guzmango", "San Benito", "Santa Cruz de Toled", "Tantarica", "Yonan"]
      },
      {
        id: "Cutervo",
        name: "Cutervo",
        distritos: ["Cutervo", "Callayuc", "Choros", "Cujillo", "La Ramada", "Pimpingos", "Querocotillo", "San Andrés de Cutervo", "San Juan de Cutervo", "San Luis de Lucma", "Santa Cruz", "Santo Domingo de La Capilla", "Santo Tomas", "Socota", "Toribio Casanova"]
      },
      {
        id: "Hualgayoc",
        name: "Hualgayoc",
        distritos: ["Bambamarca", "Chugur", "Hualgayoc"]
      },
      {
        id: "Jaén",
        name: "Jaén",
        distritos: ["Jaén", "Bellavista", "Chontali", "Colasay", "Huabal", "Las Pirias", "Pomahuaca", "Pucara", "Sallique", "San Felipe", "San Jose del Alto", "Santa Rosa"]
      },
      {
        id: "San Ignacio",
        name: "San Ignacio",
        distritos: ["San Ignacio", "Chirinos", "Huarango", "La Coipa", "Namballe", "San Jose de Lourdes", "Tabaconas"]
      },
      {
        id: "San Marcos",
        name: "San Marcos",
        distritos: ["Pedro Gálvez", "Chancay", "Eduardo Villanueva", "Gregorio Pita", "Ichocan", "Jose Manuel Quiroz", "Jose Sabogal"]
      },
      {
        id: "San Miguel",
        name: "San Miguel",
        distritos: ["San Miguel", "Bolivar", "Calquis", "Catilluc", "El Prado", "La Florida", "Llapa", "Nanchoc", "Niepos", "San Gregorio", "San Silvestre de Cochan", "Tongod", "Union Agua Blanca"]
      },
      {
        id: "San Pablo",
        name: "San Pablo",
        distritos: ["San Pablo", "San Bernardino", "San Luis", "Tumbaden"]
      },
      {
        id: "Santa Cruz",
        name: "Santa Cruz",
        distritos: ["Santa Cruz", "Andabamba", "Catache", "Chancaybaños", "La Esperanza", "Ninabamba", "Pulan", "Saucepampa", "Sexi", "Uticyacu", "Yauyucan"]
      }
    ]
  },
  {
    id: "Callao",
    name: "Callao",
    provincias: [
      {
        id: "Callao",
        name: "Callao",
        distritos: ["Callao", "Bellavista", "Carmen de La Legua", "La Perla", "La Punta", "Ventanilla", "Mi Perú"]
      }
    ]
  },
  {
    id: "Cusco",
    name: "Cusco",
    provincias: [
      {
        id: "Cusco",
        name: "Cusco",
        distritos: ["Cusco", "Ccorca", "Poroy", "San Jerónimo", "San Sebastian", "Santiago", "Saylla", "Wanchaq"]
      },
      {
        id: "Acomayo",
        name: "Acomayo",
        distritos: ["Acomayo", "Acopia", "Acos", "Mosoc Llacta", "Pomacanchi", "Rondocan", "Sangarara"]
      },
      {
        id: "Anta",
        name: "Anta",
        distritos: ["Anta", "Ancahuasi", "Cachimayo", "Chinchaypujio", "Huarocondo", "Limatambo", "Mollepata", "Pucyura", "Zurite"]
      },
      {
        id: "Calca",
        name: "Calca",
        distritos: ["Calca", "Coya", "Lamay", "Lares", "Pisac", "San Salvador", "Taray", "Yanatile"]
      },
      {
        id: "Canas",
        name: "Canas",
        distritos: ["Yanaoca", "Checca", "Kunturkanki", "Langui", "Layo", "Pampamarca", "Quehue", "Tupac Amaru"]
      },
      {
        id: "Canchis",
        name: "Canchis",
        distritos: ["Sicuani", "Checacupe", "Combapata", "Marangani", "Pitumarca", "San Pablo", "San Pedro", "Tinta"]
      },
      {
        id: "Chumbivilcas",
        name: "Chumbivilcas",
        distritos: ["Santo Tomas", "Capacmarca", "Chamaca", "Colquemarca", "Livitaca", "Llusco", "Quiñota", "Velille"]
      },
      {
        id: "Espinar",
        name: "Espinar",
        distritos: ["Espinar", "Condoroma", "Coporaque", "Ocoruro", "Pallpata", "Pichigua", "Suyckutambo", "Alto Pichigua"]
      },
      {
        id: "La Convención",
        name: "La Convención",
        distritos: ["Santa Ana", "Echarate", "Huayopata", "Maranura", "Ocobamba", "Quellouno", "Kimbiri", "Santa Teresa", "Vilcabamba", "Pichari", "Inkawasi", "Villa Virgen", "Villa Kintiarina", "Megantoni"]
      },
      {
        id: "Paruro",
        name: "Paruro",
        distritos: ["Paruro", "Accha", "Ccapi", "Colcha", "Huanoquite", "Omacha", "Paccaritambo", "Pillpinto", "Yaurisque"]
      },
      {
        id: "Paucartambo",
        name: "Paucartambo",
        distritos: ["Paucartambo", "Caicay", "Challabamba", "Colquepata", "Huancarani", "Kosñipata"]
      },
      {
        id: "Quispicanchi",
        name: "Quispicanchi",
        distritos: ["Urcos", "Andahuaylillas", "Camanti", "Ccarhuayo", "Ccatca", "Cusipata", "Huaro", "Lucre", "Marcapata", "Ocongate", "Oropesa", "Quiquijana"]
      },
      {
        id: "Urubamba",
        name: "Urubamba",
        distritos: ["Urubamba", "Chinchero", "Huayllabamba", "Machupicchu", "Maras", "Ollantaytambo", "Yucay"]
      }
    ]
  },
  {
    id: "Huancavelica",
    name: "Huancavelica",
    provincias: [
      {
        id: "Huancavelica",
        name: "Huancavelica",
        distritos: ["Huancavelica", "Acobambilla", "Acoria", "Conayca", "Cuenca", "Huachocolpa", "Huayllahuara", "Izcuchaca", "Laria", "Manta", "Mariscal Cáceres", "Moya", "Nuevo Occoro", "Palca", "Pilchaca", "Vilca", "Yauli", "Ascensión", "Huando"]
      },
      {
        id: "Acobamba",
        name: "Acobamba",
        distritos: ["Acobamba", "Andabamba", "Anta", "Caja", "Marcas", "Paucara", "Pomacocha", "Rosario"]
      },
      {
        id: "Angaraes",
        name: "Angaraes",
        distritos: ["Lircay", "Anchonga", "Callanmarca", "Ccochaccasa", "Chincho", "Congalla", "Huanca-Huanca", "Huayllay Grande", "Julcamarca", "San Antonio de Antaparco", "Santo Tomas de Pata", "Secclla"]
      },
      {
        id: "Castrovirreyna",
        name: "Castrovirreyna",
        distritos: ["Castrovirreyna", "Arma", "Aurahua", "Capillas", "Chupamarca", "Cocas", "Huachos", "Huamatambo", "Mollepampa", "San Juan", "Santa Ana", "Tantara", "Ticrapo"]
      },
      {
        id: "Churcampa",
        name: "Churcampa",
        distritos: ["Churcampa", "Anco", "Chinchihuasi", "El Carmen", "La Merced", "Locroja", "Paucarbamba", "San Miguel de Mayocc", "San Pedro de Coris", "Pachamarca", "Cosme"]
      },
      {
        id: "Huaytara",
        name: "Huaytara",
        distritos: ["Huaytara", "Ayavi", "Córdova", "Huayacundo Arma", "Laramarca", "Ocoyo", "Pilpichaca", "Querco", "Quito-Arma", "San Antonio de Cusicancha", "San Francisco de Sangayaico", "San Isidro", "Santiago de Chocorvos", "Santiago de Quirahuara", "Santo Domingo de Capillas", "Tambo"]
      },
      {
        id: "Tayacaja",
        name: "Tayacaja",
        distritos: ["Pampas", "Acostambo", "Acraquia", "Ahuaycha", "Colcabamba", "Daniel Hernández", "Huachocolpa", "Huaribamba", "Ñahuimpuquio", "Pazos", "Quishuar", "Salcabamba", "Salcahuasi", "San Marcos de Rocchac", "Surcubamba", "Tintay Puncu", "Quichuas", "Andaymarca", "Roble", "Pichos", "Santiago de Tucuma"]
      }
    ]
  },
  {
    id: "Huanuco",
    name: "Huanuco",
    provincias: [
      {
        id: "Huanuco",
        name: "Huanuco",
        distritos: ["Huanuco", "Amarilis", "Chinchao", "Churubamba", "Margos", "Quisqui", "San Francisco de Cayran", "San Pedro de Chaulan", "Santa Maria del Valle", "Yarumayo", "Pillco Marca", "Yacus", "San Pablo de Pillao"]
      },
      {
        id: "Ambo",
        name: "Ambo",
        distritos: ["Ambo", "Cayna", "Colpas", "Conchamarca", "Huacar", "San Francisco", "San Rafael", "Tomay Kichwa"]
      },
      {
        id: "Dos de Mayo",
        name: "Dos de Mayo",
        distritos: ["La Union", "Chuquis", "Marías", "Pachas", "Quivilla", "Ripan", "Shunqui", "Sillapata", "Yanas"]
      },
      {
        id: "Huacaybamba",
        name: "Huacaybamba",
        distritos: ["Huacaybamba", "Canchabamba", "Cochabamba", "Pinra"]
      },
      {
        id: "Huamalíes",
        name: "Huamalíes",
        distritos: ["Llata", "Arancay", "Chavin de Pariarca", "Jacas Grande", "Jircan", "Miraflores", "Monzón", "Punchao", "Puños", "Singa", "Tantamayo"]
      },
      {
        id: "Leoncio Prado",
        name: "Leoncio Prado",
        distritos: ["Rupa-Rupa", "Daniel Alomias Robles", "Hermílio Valdizan", "Jose Crespo y Castillo", "Luyando", "Mariano Damaso Beraun", "Pucayacu", "Castillo Grande", "Pueblo Nuevo", "Santo Domingo de Anda"]
      },
      {
        id: "Marañon",
        name: "Marañon",
        distritos: ["Huacrachuco", "Cholon", "San Buenaventura", "La Morada", "Santa Rosa de Alto Yanajanca"]
      },
      {
        id: "Pachitea",
        name: "Pachitea",
        distritos: ["Panao", "Chaglla", "Molino", "Umari"]
      },
      {
        id: "Puerto Inca",
        name: "Puerto Inca",
        distritos: ["Puerto Inca", "Codo del Pozuzo", "Honoria", "Tournavista", "Yuyapichis"]
      },
      {
        id: "Lauricocha",
        name: "Lauricocha",
        distritos: ["Jesus", "Baños", "Jivia", "Queropalca", "Rondos", "San Francisco de Asís", "San Miguel de Cauri"]
      },
      {
        id: "Yarowilca",
        name: "Yarowilca",
        distritos: ["Chavinillo", "Cahuac", "Chacabamba", "Aparicio Pomares", "Jacas Chico", "Obas", "Pampamarca", "Choras"]
      }
    ]
  },
  {
    id: "Ica",
    name: "Ica",
    provincias: [
      {
        id: "Ica",
        name: "Ica",
        distritos: ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacutec", "Parcona", "Pueblo Nuevo", "Salas", "San Jose de los Molinos", "San Juan Bautista", "Santiago", "Subtanjalla", "Tate", "Yauca del Rosario"]
      },
      {
        id: "Chincha",
        name: "Chincha",
        distritos: ["Chincha Alta", "Alto Laran", "Chavin", "Chincha Baja", "El Carmen", "Grocio Prado", "Pueblo Nuevo", "San Juan de Yanac", "San Pedro de Huacarpana", "Sunampe", "Tambo de Mora"]
      },
      {
        id: "Nazca",
        name: "Nazca",
        distritos: ["Nazca", "Changuillo", "El Ingenio", "Marcona", "Vista Alegre"]
      },
      {
        id: "Palpa",
        name: "Palpa",
        distritos: ["Palpa", "Llipata", "Rio Grande", "Santa Cruz", "Tibillo"]
      },
      {
        id: "Pisco",
        name: "Pisco",
        distritos: ["Pisco", "Huancano", "Humay", "Independencia", "Paracas", "San Andrés", "San Clemente", "Tupac Amaru Inca"]
      }
    ]
  },
  {
    id: "Junín",
    name: "Junín",
    provincias: [
      {
        id: "Huancayo",
        name: "Huancayo",
        distritos: ["Huancayo", "Carhuacallanga", "Chacapampa", "Chicche", "Chilca", "Chongos Alto", "Chupuro", "Colca", "Cullhuas", "El Tambo", "Huacrapuquio", "Hualhuas", "Huancan", "Huasicancha", "Huayucachi", "Ingenio", "Pariahuanca", "Pilcomayo", "Pucara", "Quichuay", "Quilcas", "San Agustín", "San Jerónimo de Tunan", "Saño", "Sapallanga", "Sicaya", "Santo Domingo de Acobamba", "Viques"]
      },
      {
        id: "Concepcion",
        name: "Concepcion",
        distritos: ["Concepcion", "Aco", "Andamarca", "Chambara", "Cochas", "Comas", "Heroínas Toledo", "Manzanares", "Mariscal Castilla", "Matahuasi", "Mito", "Nueve de Julio", "Orcotuna", "San Jose de Quero", "Santa Rosa de Ocopa"]
      },
      {
        id: "Chanchamayo",
        name: "Chanchamayo",
        distritos: ["Chanchamayo", "Perene", "Pichanaqui", "San Luis de Shuaro", "San Ramón", "Vitoc"]
      },
      {
        id: "Jauja",
        name: "Jauja",
        distritos: ["Jauja", "Acolla", "Apata", "Ataura", "Canchayllo", "Curicaca", "El Mantaro", "Huamali", "Huaripampa", "Huertas", "Janjaillo", "Julcan", "Leonor Ordóñez", "Llocllapampa", "Marco", "Masma", "Masma Chicche", "Molinos", "Monobamba", "Muqui", "Muquiyauyo", "Paca", "Paccha", "Pancan", "Parco", "Pomacancha", "Ricran", "San Lorenzo", "San Pedro de Chunan", "Sausa", "Sincos", "Tunan Marca", "Yauli", "Yauyos"]
      },
      {
        id: "Junín",
        name: "Junín",
        distritos: ["Junín", "Carhuamayo", "Ondores", "Ulcumayo"]
      },
      {
        id: "Satipo",
        name: "Satipo",
        distritos: ["Satipo", "Coviriali", "Llaylla", "Mazamari", "Pampa Hermosa", "Pangoa", "Rio Negro", "Rio Tambo", "Vizcatan del Ene"]
      },
      {
        id: "Tarma",
        name: "Tarma",
        distritos: ["Tarma", "Acobamba", "Huaricolca", "Huasahuasi", "La Union", "Palca", "Palcamayo", "San Pedro de Cajas", "Tapo"]
      },
      {
        id: "Yauli",
        name: "Yauli",
        distritos: ["La Oroya", "Chacapalpa", "Huay-Huay", "Marcapomacocha", "Morococha", "Paccha", "Santa Barbara de Carhuacayan", "Santa Rosa de Sacco", "Suitucancha", "Yauli"]
      },
      {
        id: "Chupaca",
        name: "Chupaca",
        distritos: ["Chupaca", "Ahuac", "Chongos Bajo", "Huachac", "Huamancaca Chico", "San Juan de Yscos", "San Juan de Jarpa", "Tres de Diciembre", "Yanacancha"]
      }
    ]
  },
  {
    id: "La Libertad",
    name: "La Libertad",
    provincias: [
      {
        id: "Trujillo",
        name: "Trujillo",
        distritos: ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Victor Larco Herrera"]
      },
      {
        id: "Ascope",
        name: "Ascope",
        distritos: ["Ascope", "Chicama", "Chocope", "Magdalena de Cao", "Paijan", "Rázuri", "Santiago de Cao", "Casa Grande"]
      },
      {
        id: "Bolivar",
        name: "Bolivar",
        distritos: ["Bolivar", "Bambamarca", "Condormarca", "Longotea", "Uchumarca", "Ucuncha"]
      },
      {
        id: "Chepén",
        name: "Chepén",
        distritos: ["Chepén", "Pacanga", "Pueblo Nuevo"]
      },
      {
        id: "Julcan",
        name: "Julcan",
        distritos: ["Julcan", "Calamarca", "Carabamba", "Huaso"]
      },
      {
        id: "Otuzco",
        name: "Otuzco",
        distritos: ["Otuzco", "Agallpampa", "Charat", "Huaranchal", "La Cuesta", "Mache", "Paranday", "Salpo", "Sinsicap", "Usquil"]
      },
      {
        id: "Pacasmayo",
        name: "Pacasmayo",
        distritos: ["San Pedro de Lloc", "Guadalupe", "Jequetepeque", "Pacasmayo", "San Jose"]
      },
      {
        id: "Pataz",
        name: "Pataz",
        distritos: ["Tayabamba", "Buldibuyo", "Chillia", "Huancaspata", "Huaylillas", "Huayo", "Ongon", "Parcoy", "Pataz", "Pias", "Santiago de Challas", "Taurija", "Urpay"]
      },
      {
        id: "Sánchez Carrión",
        name: "Sánchez Carrión",
        distritos: ["Huamachuco", "Chugay", "Cochorco", "Curgos", "Marcabal", "Sanagoran", "Sarin", "Sartimbamba"]
      },
      {
        id: "Santiago de Chuco",
        name: "Santiago de Chuco",
        distritos: ["Santiago de Chuco", "Angasmarca", "Cachicadan", "Mollebamba", "Mollepata", "Quiruvilca", "Santa Cruz de Chuca", "Sitabamba"]
      },
      {
        id: "Gran Chimú",
        name: "Gran Chimú",
        distritos: ["Cascas", "Lucma", "Compin", "Sayapullo"]
      },
      {
        id: "Virú",
        name: "Virú",
        distritos: ["Virú", "Chao", "Guadalupito"]
      }
    ]
  },
  {
    id: "Lambayeque",
    name: "Lambayeque",
    provincias: [
      {
        id: "Chiclayo",
        name: "Chiclayo",
        distritos: ["Chiclayo", "Chongoyape", "Eten", "Eten Puerto", "Jose Leonardo Ortiz", "La Victoria", "Lagunas", "Monsefu", "Nueva Arica", "Oyotun", "Picsi", "Pimentel", "Reque", "Santa Rosa", "Saña", "Cayalti", "Patapo", "Pomalca", "Pucala", "Tuman"]
      },
      {
        id: "Ferreñafe",
        name: "Ferreñafe",
        distritos: ["Ferreñafe", "Cañaris", "Incahuasi", "Manuel Antonio Mesones Muro", "Pitipo", "Pueblo Nuevo"]
      },
      {
        id: "Lambayeque",
        name: "Lambayeque",
        distritos: ["Lambayeque", "Chochope", "Illimo", "Jayanca", "Mochumi", "Morrope", "Motupe", "Olmos", "Pacora", "Salas", "San Jose", "Tucume"]
      }
    ]
  },
  {
    id: "Lima",
    name: "Lima",
    provincias: [
      {
        id: "Lima",
        name: "Lima",
        distritos: ["Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesus Maria", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurin", "Magdalena del Mar", "Pueblo Libre", "Miraflores", "Pachacamac", "Pucusana", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santa Maria del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa Maria del Triunfo"]
      },
      {
        id: "Barranca",
        name: "Barranca",
        distritos: ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto"]
      },
      {
        id: "Cajatambo",
        name: "Cajatambo",
        distritos: ["Cajatambo", "Copa", "Gorgor", "Huancapon", "Manas"]
      },
      {
        id: "Canta",
        name: "Canta",
        distritos: ["Canta", "Arahuay", "Huamantanga", "Huaros", "Lachaqui", "San Buenaventura", "Santa Rosa de Quives"]
      },
      {
        id: "Cañete",
        name: "Cañete",
        distritos: ["San Vicente de Cañete", "Asia", "Calango", "Cerro Azul", "Chilca", "Coayllo", "Imperial", "Lunahuana", "Mala", "Nuevo Imperial", "Pacaran", "Quilmana", "San Antonio", "San Luis", "Santa Cruz de Flores", "Zúñiga"]
      },
      {
        id: "Huaral",
        name: "Huaral",
        distritos: ["Huaral", "Atavillos Alto", "Atavillos Bajo", "Aucallama", "Chancay", "Ihuari", "Lampian", "Pacaraos", "San Miguel de Acos", "Santa Cruz de Andamarca", "Sumbilca", "Veintisiete de Noviembre"]
      },
      {
        id: "Huarochiri",
        name: "Huarochiri",
        distritos: ["Matucana", "Antioquia", "Callahuanca", "Carampoma", "Chicla", "Cuenca", "Huachupampa", "Huanza", "Huarochiri", "Lahuaytambo", "Langa", "Laraos", "Mariatana", "Ricardo Palma", "San Andrés de Tupicocha", "San Antonio", "San Bartolomé", "San Damian", "San Juan de Iris", "San Juan de Tantaranche", "San Lorenzo de Quinti", "San Mateo", "San Mateo de Otao", "San Pedro de Casta", "San Pedro de Huancayre", "Sangallaya", "Santa Cruz de Cocachacra", "Santa Eulalia", "Santiago de Anchucaya", "Santiago de Tuna", "Santo Domingo de los Olleros", "Surco"]
      },
      {
        id: "Huaura",
        name: "Huaura",
        distritos: ["Huacho", "Ambar", "Caleta de Carquin", "Checras", "Hualmay", "Huaura", "Leoncio Prado", "Paccho", "Santa Leonor", "Santa Maria", "Sayan", "Vegueta"]
      },
      {
        id: "Oyon",
        name: "Oyon",
        distritos: ["Oyon", "Andajes", "Caujul", "Cochamarca", "Navan", "Pachangara"]
      },
      {
        id: "Yauyos",
        name: "Yauyos",
        distritos: ["Yauyos", "Alis", "Ayauca", "Ayaviri", "Azángaro", "Cacra", "Carania", "Catahuasi", "Chocos", "Cochas", "Colonia", "Hongos", "Huampara", "Huancaya", "Huangascar", "Huantan", "Huañec", "Laraos", "Lincha", "Madean", "Miraflores", "Omas", "Putinza", "Quinches", "Quinocay", "San Joaquín", "San Pedro de Pilas", "Tanta", "Tauripampa", "Tomas", "Tupe", "Viñac", "Vitis"]
      }
    ]
  },
  {
    id: "Loreto",
    name: "Loreto",
    provincias: [
      {
        id: "Maynas",
        name: "Maynas",
        distritos: ["Iquitos", "Alto Nanay", "Fernando Lores", "Indiana", "Las Amazonas", "Mazan", "Napo", "Punchana", "Torres Causana", "Belén", "San Juan Bautista"]
      },
      {
        id: "Alto Amazonas",
        name: "Alto Amazonas",
        distritos: ["Yurimaguas", "Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente Cesar López Rojas"]
      },
      {
        id: "Loreto",
        name: "Loreto",
        distritos: ["Nauta", "Parinari", "Tigre", "Trompeteros", "Urarinas"]
      },
      {
        id: "Mariscal Ramón Castilla",
        name: "Mariscal Ramón Castilla",
        distritos: ["Ramón Castilla", "Pebas", "Yavari", "San Pablo"]
      },
      {
        id: "Requena",
        name: "Requena",
        distritos: ["Requena", "Alto Tapiche", "Capelo", "Emilio San Martín", "Maquia", "Puinahua", "Saquena", "Soplin", "Tapiche", "Jenaro Herrera", "Yaquerana"]
      },
      {
        id: "Ucayali",
        name: "Ucayali",
        distritos: ["Contamana", "Inahuaya", "Padre Marquez", "Pampa Hermosa", "Sarayacu", "Vargas Guerra"]
      },
      {
        id: "Datem del Marañon",
        name: "Datem del Marañon",
        distritos: ["Barranca", "Cahuapanas", "Manseriche", "Morona", "Pastaza", "Andoas"]
      },
      {
        id: "Maynas",
        name: "Maynas",
        distritos: ["Putumayo", "Rosa Panduro", "Teniente Manuel Clavero", "Yaguas"]
      }
    ]
  },
  {
    id: "Madre de Dios",
    name: "Madre de Dios",
    provincias: [
      {
        id: "Tambopata",
        name: "Tambopata",
        distritos: ["Tambopata", "Inambari", "Las Piedras", "Laberinto"]
      },
      {
        id: "Manu",
        name: "Manu",
        distritos: ["Manu", "Fitzcarrald", "Madre de Dios", "Huepetuhe"]
      },
      {
        id: "Tahuamanu",
        name: "Tahuamanu",
        distritos: ["Iñapari", "Iberia", "Tahuamanu"]
      }
    ]
  },
  {
    id: "Moquegua",
    name: "Moquegua",
    provincias: [
      {
        id: "Mariscal Nieto",
        name: "Mariscal Nieto",
        distritos: ["Moquegua", "Carumas", "Cuchumbaya", "Samegua", "San Cristóbal", "Torata"]
      },
      {
        id: "General Sánchez Cerro",
        name: "General Sánchez Cerro",
        distritos: ["Omate", "Chojata", "Coalaque", "Ichuña", "La Capilla", "Lloque", "Matalaque", "Puquina", "Quinistaquillas", "Ubinas", "Yunga"]
      },
      {
        id: "Ilo",
        name: "Ilo",
        distritos: ["Ilo", "El Algarrobal", "Pacocha"]
      }
    ]
  },
  {
    id: "Pasco",
    name: "Pasco",
    provincias: [
      {
        id: "Pasco",
        name: "Pasco",
        distritos: ["Chaupimarca", "Huachon", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra", "Paucartambo", "San Francisco de Asís de Yarusyacan", "Simon Bolivar", "Ticlacayan", "Tinyahuarco", "Vicco", "Yanacancha"]
      },
      {
        id: "Daniel Alcides Carrión",
        name: "Daniel Alcides Carrión",
        distritos: ["Yanahuanca", "Chacayan", "Goyllarisquizga", "Paucar", "San Pedro de Pillao", "Santa Ana de Tusi", "Tapuc", "Vilcabamba"]
      },
      {
        id: "Oxapampa",
        name: "Oxapampa",
        distritos: ["Oxapampa", "Chontabamba", "Huancabamba", "Palcazu", "Pozuzo", "Puerto Bermúdez", "Villa Rica", "Constitución"]
      }
    ]
  },
  {
    id: "Piura",
    name: "Piura",
    provincias: [
      {
        id: "Piura",
        name: "Piura",
        distritos: ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallan", "La Arena", "La Union", "Las Lomas", "Tambo Grande", "26 de Octubre"]
      },
      {
        id: "Ayabaca",
        name: "Ayabaca",
        distritos: ["Ayabaca", "Frias", "Jilili", "Lagunas", "Montero", "Pacaipampa", "Paimas", "Sapillica", "Sicchez", "Suyo"]
      },
      {
        id: "Huancabamba",
        name: "Huancabamba",
        distritos: ["Huancabamba", "Canchaque", "El Carmen de La Frontera", "Huarmaca", "Lalaquiz", "San Miguel de El Faique", "Sondor", "Sondorillo"]
      },
      {
        id: "Morropon",
        name: "Morropon",
        distritos: ["Chulucanas", "Buenos Aires", "Chalaco", "La Matanza", "Morropon", "Salitral", "San Juan de Bigote", "Santa Catalina de Mossa", "Santo Domingo", "Yamango"]
      },
      {
        id: "Paita",
        name: "Paita",
        distritos: ["Paita", "Amotape", "Arenal", "Colan", "La Huaca", "Tamarindo", "Vichayal"]
      },
      {
        id: "Sullana",
        name: "Sullana",
        distritos: ["Sullana", "Bellavista", "Ignacio Escudero", "Lancones", "Marcavelica", "Miguel Checa", "Querecotillo", "Salitral"]
      },
      {
        id: "Talara",
        name: "Talara",
        distritos: ["Pariñas", "El Alto", "La Brea", "Lobitos", "Los Organos", "Mancora"]
      },
      {
        id: "Sechura",
        name: "Sechura",
        distritos: ["Sechura", "Bellavista de La Union", "Bernal", "Cristo Nos Valga", "Vice", "Rinconada Llicuar"]
      }
    ]
  },
  {
    id: "Puno",
    name: "Puno",
    provincias: [
      {
        id: "Puno",
        name: "Puno",
        distritos: ["Puno", "Acora", "Amantani", "Atuncolla", "Capachica", "Chucuito", "Coata", "Huata", "Mañazo", "Paucarcolla", "Pichacani", "Plateria", "San Antonio", "Tiquillaca", "Vilque"]
      },
      {
        id: "Azángaro",
        name: "Azángaro",
        distritos: ["Azángaro", "Achaya", "Arapa", "Asillo", "Caminaca", "Chupa", "Jose Domingo Choquehuanca", "Muñani", "Potoni", "Saman", "San Anton", "San Jose", "San Juan de Salinas", "Santiago de Pupuja", "Tirapata"]
      },
      {
        id: "Carabaya",
        name: "Carabaya",
        distritos: ["Macusani", "Ajoyani", "Ayapata", "Coasa", "Corani", "Crucero", "Ituata", "Ollachea", "San Gaban", "Usicayos"]
      },
      {
        id: "Chucuito",
        name: "Chucuito",
        distritos: ["Juli", "Desaguadero", "Huacullani", "Kelluyo", "Pisacoma", "Pomata", "Zepita"]
      },
      {
        id: "El Collao",
        name: "El Collao",
        distritos: ["Ilave", "Capazo", "Pilcuyo", "Santa Rosa", "Conduriri"]
      },
      {
        id: "Huancane",
        name: "Huancane",
        distritos: ["Huancane", "Cojata", "Huatasani", "Inchupalla", "Pusi", "Rosaspata", "Taraco", "Vilque Chico"]
      },
      {
        id: "Lampa",
        name: "Lampa",
        distritos: ["Lampa", "Cabanilla", "Calapuja", "Nicasio", "Ocuviri", "Palca", "Paratia", "Pucara", "Santa Lucia", "Vilavila"]
      },
      {
        id: "Melgar",
        name: "Melgar",
        distritos: ["Ayaviri", "Antauta", "Cupi", "Llalli", "Macari", "Nuñoa", "Orurillo", "Santa Rosa", "Umachiri"]
      },
      {
        id: "Moho",
        name: "Moho",
        distritos: ["Moho", "Conima", "Huayrapata", "Tilali"]
      },
      {
        id: "San Antonio de Putina",
        name: "San Antonio de Putina",
        distritos: ["Putina", "Ananea", "Pedro Vilca Apaza", "Quilcapuncu", "Sina"]
      },
      {
        id: "San Román",
        name: "San Román",
        distritos: ["Juliaca", "Cabana", "Cabanillas", "Caracoto", "San Miguel"]
      },
      {
        id: "Sandia",
        name: "Sandia",
        distritos: ["Sandia", "Cuyocuyo", "Limbani", "Patambuco", "Phara", "Quiaca", "San Juan del Oro", "Yanahuaya", "Alto Inambari", "San Pedro de Putina Punco"]
      },
      {
        id: "Yunguyo",
        name: "Yunguyo",
        distritos: ["Yunguyo", "Anapia", "Copani", "Cuturapi", "Ollaraya", "Tinicachi", "Unicachi"]
      }
    ]
  },
  {
    id: "San Martín",
    name: "San Martín",
    provincias: [
      {
        id: "Moyobamba",
        name: "Moyobamba",
        distritos: ["Moyobamba", "Calzada", "Habana", "Jepelacio", "Soritor", "Yantalo"]
      },
      {
        id: "San Martín",
        name: "San Martín",
        distritos: ["Bellavista", "Alto Biavo", "Bajo Biavo", "Huallaga", "San Pablo", "San Rafael"]
      },
      {
        id: "El Dorado",
        name: "El Dorado",
        distritos: ["San Jose de Sisa", "Agua Blanca", "San Martín", "Santa Rosa", "Shatoja"]
      },
      {
        id: "Huallaga",
        name: "Huallaga",
        distritos: ["Saposoa", "Alto Saposoa", "El Eslabón", "Piscoyacu", "Sacanche", "Tingo de Saposoa"]
      },
      {
        id: "Lamas",
        name: "Lamas",
        distritos: ["Lamas", "Alonso de Alvarado", "Barranquita", "Caynarachi", "Cuñumbuqui", "Pinto Recodo", "Rumisapa", "San Roque de Cumbaza", "Shanao", "Tabalosos", "Zapatero"]
      },
      {
        id: "Mariscal Cáceres",
        name: "Mariscal Cáceres",
        distritos: ["Juanjuí", "Campanilla", "Huicungo", "Pachiza", "Pajarillo"]
      },
      {
        id: "Picota",
        name: "Picota",
        distritos: ["Picota", "Buenos Aires", "Caspisapa", "Pilluana", "Pucacaca", "San Cristóbal", "San Hilarión", "Shamboyacu", "Tingo de Ponasa", "Tres Unidos"]
      },
      {
        id: "Rioja",
        name: "Rioja",
        distritos: ["Rioja", "Awajun", "Elías Soplin Vargas", "Nueva Cajamarca", "Pardo Miguel", "Posic", "San Fernando", "Yorongos", "Yuracyacu"]
      },
      {
        id: "San Martín",
        name: "San Martín",
        distritos: ["Tarapoto", "Alberto Leveau", "Cacatachi", "Chazuta", "Chipurana", "El Porvenir", "Huimbayoc", "Juan Guerra", "La Banda de Shilcayo", "Morales", "Papaplaya", "San Antonio", "Sauce", "Shapaja"]
      },
      {
        id: "Tocache",
        name: "Tocache",
        distritos: ["Tocache", "Nuevo Progreso", "Polvora", "Shunte", "Uchiza"]
      }
    ]
  },
  {
    id: "Tacna",
    name: "Tacna",
    provincias: [
      {
        id: "Tacna",
        name: "Tacna",
        distritos: ["Tacna", "Alto de La Alianza", "Calana", "Ciudad Nueva", "Inclan", "Pachia", "Palca", "Pocollay", "Sama", "Coronel Gregorio Albarracín Lanchipa", "La Yarada-Los Palos"]
      },
      {
        id: "Candarave",
        name: "Candarave",
        distritos: ["Candarave", "Cairani", "Camilaca", "Curibaya", "Huanuara", "Quilahuani"]
      },
      {
        id: "Jorge Basadre",
        name: "Jorge Basadre",
        distritos: ["Locumba", "Ilabaya", "Ite"]
      },
      {
        id: "Tarata",
        name: "Tarata",
        distritos: ["Tarata", "Héroes Albarracín", "Estique", "Estique-Pampa", "Sitajara", "Susapaya", "Tarucachi", "Ticaco"]
      }
    ]
  },
  {
    id: "Tumbes",
    name: "Tumbes",
    provincias: [
      {
        id: "Tumbes",
        name: "Tumbes",
        distritos: ["Tumbes", "Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de La Virgen"]
      },
      {
        id: "Contralmirante Villa",
        name: "Contralmirante Villa",
        distritos: ["Zorritos", "Casitas", "Canoas de Punta Sal"]
      },
      {
        id: "Zarumilla",
        name: "Zarumilla",
        distritos: ["Zarumilla", "Aguas Verdes", "Matapalo", "Papayal"]
      }
    ]
  },
  {
    id: "Ucayali",
    name: "Ucayali",
    provincias: [
      {
        id: "Coronel Portillo",
        name: "Coronel Portillo",
        distritos: ["Calleria", "Campoverde", "Iparia", "Masisea", "Yarinacocha", "Nueva Requena", "Manantay"]
      },
      {
        id: "Atalaya",
        name: "Atalaya",
        distritos: ["Raymondi", "Sepahua", "Tahuania", "Yurua"]
      },
      {
        id: "Padre Abad",
        name: "Padre Abad",
        distritos: ["Padre Abad", "Irazola", "Curimana", "Neshuya", "Alexander Von Humboldt"]
      },
      {
        id: "Purús",
        name: "Purús",
        distritos: ["Purús"]
      }
    ]
  }
];

export default DEPARTAMENTOS;