
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: {
    src: string;
    alt: string;
    hint: string;
  };
};

function createSlug(title: string) {
  return title.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-àáâçèéêëíîïòóôöúûüñ]+/g, '');
}

const postsData = [
  {
    id: '1',
    title: 'El Futur de la Logística: IA i Automatització a Ivora Logistics',
    author: 'Wiam, Co-fundador',
    date: '15 de juliol de 2024',
    image: {
        src: '/camió.jpg',
        alt: 'Imatge d\'un camió',
        hint: 'camió'
    },
    excerpt: 'Descobreix com a Ivora Logistics aprofitem la Intel·ligència Artificial i l\'automatització per redefinir la logística, des del nostre magatzem a Constantí fins a l\'entrega internacional.',
    content: `
<p>La indústria logística està en plena transformació, i a Ivora Logistics estem al capdavant, integrant la Intel·ligència Artificial (IA) i l'automatització per oferir una eficiència i fiabilitat sense precedents.</p>

<h3 class="font-bold text-xl my-4">Digitalització i Intel·ligència Artificial</h3>
<p>L'adopció de la intel·ligència artificial i el big data ens permet optimitzar les rutes de transport internacional i la gestió d'inventaris, reduint costos i temps de lliurament. Els nostres sistemes predictius ajuden a anticipar la demanda, minimitzant errors en el flux logístic i garantint que els productes de disseny i decoració, la nostra especialitat, es gestionin amb la màxima precisió.</p>

<h3 class="font-bold text-xl my-4">Automatització al Nostre Magatzem de Constantí</h3>
<p>La implementació de robòtica col·laborativa i sistemes automatitzats de picking al nostre magatzem de Constantí millora dràsticament l'eficiència i la seguretat. Aquests sistemes ens permeten gestionar grans volums de mercaderies, especialment objectes delicats, amb una precisió inigualable.</p>

<h3 class="font-bold text-xl my-4">El Camí Cap al Futur</h3>
<p>A Ivora Logistics, estem convençuts que l'aposta per la tecnologia no és només una inversió en eficiència, sinó també un compromís amb l'excel·lència en l'experiència del client. Estem preparats per liderar el futur de la logística.</p>
`
  },
  {
    id: '2',
    title: 'La nostra aposta per una Cadena de Subministrament Sostenible',
    author: 'Álvaro, Co-fundador',
    date: '10 de juliol de 2024',
    image: {
        src: '/logistica-y-transporte.jpg',
        alt: 'Imatge sobre logística i transport',
        hint: 'logística transport'
    },
    excerpt: 'La sostenibilitat és un pilar fonamental a Ivora Logistics. A continuació, expliquem les nostres estratègies per una cadena de subministrament més respectuosa amb el medi ambient.',
    content: `
<p>A Ivora Logistics, entenem que una cadena de subministrament sostenible no només és bona per al planeta, sinó que és essencial per a un negoci responsable i eficient. Aquest és el nostre compromís.</p>

<h3 class="font-bold text-xl my-4">1. Logística Verda i Sostenibilitat</h3>
<p>El nostre enfocament inclou la progressiva incorporació de vehicles elèctrics per al transport, l'ús d'embalatges reciclables i l'optimització energètica de les nostres instal·lacions a Constantí. Volem posicionar Ivora Logistics com una empresa responsable amb el medi ambient.</p>

<h3 class="font-bold text-xl my-4">2. Embalatges Reciclables</h3>
<p>Minimitzem l'ús de materials i prioritzem embalatges fets amb contingut reciclat, especialment en els nostres serveis per a productes de disseny i decoració. Això redueix els residus i optimitza els costos.</p>

<h3 class="font-bold text-xl my-4">3. Transparència i Certificacions</h3>
<p>Estem treballant per obtenir certificacions de pràctiques sostenibles com la ISO 14001 per reforçar la nostra reputació corporativa i garantir als nostres clients que la seva confiança en nosaltres també és una aposta per la sostenibilitat.</p>

<h3 class="font-bold text-xl my-4">4. Col·laboració amb Socis Compromesos</h3>
<p>Treballem amb proveïdors que comparteixen el nostre compromís amb la sostenibilitat, creant un efecte positiu a tota la cadena de valor.</p>
`
  },
    {
    id: '3',
    title: 'Transparència i Solucions a Mida: El Segell d\'Ivora Logistics',
    author: 'Izan, Co-fundador',
    date: '5 de juliol de 2024',
    image: {
        src: '/transporte-logistico2.jpeg',
        alt: 'Imatge sobre transport logístic',
        hint: 'transport logístic'
    },
    excerpt: 'La confiança del client es basa en la transparència i l\'adaptabilitat. Descobreix com la tecnologia blockchain i les nostres solucions personalitzades marquen la diferència.',
    content: `
<p>A Ivora Logistics, creiem que cada client és únic i mereix una solució logística a la seva mida. A més, la transparència total és la base de la nostra relació amb ells.</p>

<h3 class="font-bold text-xl my-4">Transparència i Traçabilitat amb Blockchain</h3>
<p>Estem explorant la incorporació de la tecnologia blockchain als nostres processos. Això oferirà una transparència total als nostres clients, permetent-los veure el recorregut i l'estat de les seves mercaderies en temps real. Aquesta traçabilitat augmenta la confiança i reforça la percepció de qualitat del nostre servei.</p>

<h3 class="font-bold text-xl my-4">Solucions Logístiques Personalitzades</h3>
<p>La nostra especialització en transport i emmagatzematge de productes de disseny i decoració ens permet crear serveis premium. Oferim gestió d'embalatge fet a mida, control de temperatura i humitat, i assegurances específiques per a peces de gran valor. El nostre objectiu és anar més enllà de les expectatives.</p>

<h3 class="font-bold text-xl my-4">Connectivitat i Atenció al Client 24/7</h3>
<p>Estem desenvolupant una plataforma en línia perquè els nostres clients puguin gestionar els seus enviaments, consultar l'estat del seu estoc i programar lliuraments de forma autònoma. A més, amb l'ajuda de chatbots amb IA, oferirem atenció en temps real per resoldre qualsevol consulta, millorant així l'experiència del client de manera contínua.</p>
`
  },
];

export const blogPosts: BlogPost[] = postsData.map(post => ({
  ...post,
  slug: createSlug(post.title),
}));
