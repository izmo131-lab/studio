import { PlaceHolderImages } from './placeholder-images';

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
    title: 'El Futur de la Logística: IA i Automatització',
    author: 'Jane Doe, Experta en Logística',
    date: '15 de juliol de 2024',
    excerpt: 'Descobreix com la Intel·ligència Artificial i l\'automatització estan redefinint la indústria logística, des de l\'emmagatzematge fins a l\'entrega d\'última milla. Explorem els beneficis, els reptes i què esperar en els propers anys.',
    content: `
<p>La indústria logística està a punt de viure una transformació massiva, impulsada pels ràpids avenços en Intel·ligència Artificial (IA) i automatització. A Ivora Solutions, estem a l'avantguarda d'aquest canvi, integrant tecnologies intel·ligents per oferir una eficiència i fiabilitat inigualables.</p>

<h3 class="font-bold text-xl my-4">Emmagatzematge Intel·ligent</h3>
<p>Els sistemes de gestió de magatzems (SGM) impulsats per IA poden optimitzar l'emmagatzematge, predir les necessitats d'inventari i fins i tot gestionar sistemes robòtics per a la recollida i embalatge. Això es tradueix en menys errors, temps de processament més ràpids i una reducció significativa dels costos laborals. Imagina un magatzem que s'organitza a si mateix basant-se en previsions de demanda, assegurant que els articles de gran demanda estiguin sempre accessibles.</p>

<h3 class="font-bold text-xl my-4">Anàlisi Predictiva per a l'Optimització de Rutes</h3>
<p>Ja han passat els dies de les rutes de lliurament estàtiques. Els algorismes d'IA ara poden analitzar dades de trànsit, condicions meteorològiques i fins i tot possibles retards de lliurament en temps real per suggerir les rutes més eficients per a la nostra flota. Això no només garanteix lliuraments puntuals, sinó que també redueix el consum de combustible i la nostra petjada de carboni.</p>

<h3 class="font-bold text-xl my-4">El Camí per Endavant</h3>
<p>Tot i que l'adopció de la IA i l'automatització presenta alguns reptes, com els costos d'inversió inicials i la necessitat d'una mà d'obra qualificada, els beneficis són innegables. Les empreses que adoptin aquestes tecnologies obtindran un avantatge competitiu significatiu. A Ivora Solutions, estem compromesos a ajudar els nostres clients a navegar per aquest nou paisatge i a desbloquejar tot el potencial de la seva cadena de subministrament.</p>
`
  },
  {
    id: '2',
    title: '5 Estratègies per a una Cadena de Subministrament Més Sostenible',
    author: 'Joan Smith, Director de Sostenibilitat',
    date: '10 de juliol de 2024',
    excerpt: 'La sostenibilitat ja no és una paraula de moda; és un imperatiu empresarial. Aprèn cinc estratègies accionables per fer la teva cadena de subministrament més respectuosa amb el medi ambient i econòmicament viable.',
    content: `
<p>En el món actual, una cadena de subministrament sostenible no només és bona per al planeta, sinó també per al negoci. Els consumidors afavoreixen cada cop més les marques ecològiques, i les pràctiques eficients sovint condueixen a estalvis de costos. Aquí teniu cinc estratègies que recomanem a Ivora Solutions per construir una cadena de subministrament més verda.</p>

<h3 class="font-bold text-xl my-4">1. Optimitzar el Transport</h3>
<p>Això inclou l'optimització de rutes per reduir el consum de combustible, l'ús de combustibles alternatius i la consolidació d'enviaments per garantir que els camions estiguin sempre plens. Cada quilòmetre estalviat és una victòria per al medi ambient i per al teu compte de resultats.</p>

<h3 class="font-bold text-xl my-4">2. Adoptar l'Emmagatzematge Verd</h3>
<p>Des de l'ús de panells solars per alimentar les instal·lacions fins a la implementació d'il·luminació eficient energèticament i mesures d'estalvi d'aigua, els magatzems verds poden reduir dràsticament el seu impacte ambiental.</p>

<h3 class="font-bold text-xl my-4">3. Reduir i Reciclar Embalatges</h3>
<p>Minimitzar els materials d'embalatge, utilitzar contingut reciclat i dissenyar embalatges per a una fàcil reutilització o reciclatge són passos crucials. Això no només redueix els residus, sinó que també pot disminuir els costos de material.</p>

<h3 class="font-bold text-xl my-4">4. Col·laborar amb Proveïdors Sostenibles</h3>
<p>La teva cadena de subministrament és tan forta com la seva baula més feble. Treballa amb proveïdors que comparteixin el teu compromís amb la sostenibilitat. Això crea un efecte dòmino de canvi positiu a tota la indústria.</p>

<h3 class="font-bold text-xl my-4">5. Aprofitar la Tecnologia per a la Transparència</h3>
<p>Utilitza la tecnologia per fer un seguiment i mesurar el teu impacte ambiental. Aquestes dades són essencials per identificar àrees de millora i per comunicar de manera transparent els teus esforços de sostenibilitat als teus clients.</p>
`
  },
    {
    id: '3',
    title: 'Desxifrant el Codi del Lliurament d\'Última Milla',
    author: 'Emily White, Gerent de Distribució',
    date: '5 de juliol de 2024',
    excerpt: 'El pas final del procés de lliurament és sovint el més complex i costós. Aprofundim en els reptes del lliurament d\'última milla i explorem solucions innovadores per optimitzar-lo en termes de velocitat i rendibilitat.',
    content: `
<p>L'última milla del lliurament —el trajecte des d'un centre de distribució fins a la porta del client— és un punt de contacte crític. També és la part més desafiant i costosa de tot el procés logístic. A continuació, expliquem com a Ivora Solutions abordem aquest complex trencaclosques.</p>

<h3 class="font-bold text-xl my-4">El Repte Urbà</h3>
<p>Els entorns urbans densos presenten obstacles únics, com ara la congestió del trànsit, les restriccions d'aparcament i un alt volum de lliuraments individuals. És aquí on entren en joc els centres de micro-compliment i els mètodes de lliurament innovadors.</p>

<h3 class="font-bold text-xl my-4">La Tecnologia com a Solució</h3>
<p>El nostre programari d'enrutament impulsat per IA és essencial per navegar aquests reptes. Proporciona als conductors les rutes més eficients en temps real, adaptant-se a les condicions canviants sobre el terreny. A més, oferir als clients un seguiment en temps real i opcions de lliurament flexibles millora significativament l'experiència del client.</p>

<h3 class="font-bold text-xl my-4">Models de Lliurament Innovadors</h3>
<p>Estem explorant diversos models per millorar l'eficiència de l'última milla, entre els quals s'inclouen:
<ul>
  <li class="ml-4 list-disc"><strong>Sistemes de Taquilles:</strong> Taquilles segures en ubicacions convenients permeten als clients recollir paquets quan els convingui.</li>
  <li class="ml-4 list-disc"><strong>Lliurament Col·laboratiu (Crowdsourcing):</strong> Aprofitar una xarxa de conductors locals i independents pot proporcionar flexibilitat durant els pics de demanda.</li>
  <li class="ml-4 list-disc"><strong>Vehicles Elèctrics (VE):</strong> Per als lliuraments urbans, els VE redueixen tant les emissions de carboni com el soroll operatiu.</li>
</ul>
</p>

<h3 class="font-bold text-xl my-4">Un Enfocament Centrat en el Client</h3>
<p>En última instància, l'objectiu del lliurament d'última milla és un client satisfet. En oferir velocitat, fiabilitat i transparència, convertim l'últim pas de la cadena de subministrament en una impressió positiva i duradora per a la teva marca.</p>
`
  },
];

export const blogPosts: BlogPost[] = postsData.map(post => {
  const imagePlaceholder = PlaceHolderImages.find(p => p.id === `blog-post-${post.id}`);
  return {
    ...post,
    slug: createSlug(post.title),
    image: {
      src: imagePlaceholder?.imageUrl || '',
      alt: imagePlaceholder?.description || 'Imatge de l\'article del blog',
      hint: imagePlaceholder?.imageHint || 'article blog'
    }
  };
});
