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
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const postsData = [
  {
    id: '1',
    title: 'The Future of Logistics: AI and Automation',
    author: 'Jane Doe, Logistics Expert',
    date: 'July 15, 2024',
    excerpt: 'Discover how Artificial Intelligence and automation are reshaping the logistics industry, from warehousing to last-mile delivery. We explore the benefits, challenges, and what to expect in the coming years.',
    content: `
<p>The logistics industry is on the brink of a massive transformation, driven by the rapid advancements in Artificial Intelligence (AI) and automation. At Ivora Solutions, we are at the forefront of this change, integrating smart technologies to deliver unparalleled efficiency and reliability.</p>

<h3 class="font-bold text-xl my-4">Smart Warehousing</h3>
<p>AI-powered warehouse management systems (WMS) can optimize storage, predict inventory needs, and even manage robotic systems for picking and packing. This leads to fewer errors, faster processing times, and a significant reduction in labor costs. Imagine a warehouse that organizes itself based on demand forecasts, ensuring that high-demand items are always accessible.</p>

<h3 class="font-bold text-xl my-4">Predictive Analytics for Route Optimization</h3>
<p>Long gone are the days of static delivery routes. AI algorithms can now analyze traffic data, weather conditions, and even potential delivery delays in real-time to suggest the most efficient routes for our fleet. This not only ensures timely deliveries but also reduces fuel consumption and our carbon footprint.</p>

<h3 class="font-bold text-xl my-4">The Road Ahead</h3>
<p>While the adoption of AI and automation presents some challenges, such as initial investment costs and the need for a skilled workforce, the benefits are undeniable. Companies that embrace these technologies will gain a significant competitive advantage. At Ivora Solutions, we are committed to helping our clients navigate this new landscape and unlock the full potential of their supply chain.</p>
`
  },
  {
    id: '2',
    title: '5 Strategies for a More Sustainable Supply Chain',
    author: 'John Smith, Sustainability Officer',
    date: 'July 10, 2024',
    excerpt: 'Sustainability is no longer a buzzword; it\'s a business imperative. Learn five actionable strategies to make your supply chain more environmentally friendly and economically viable.',
    content: `
<p>In today's world, a sustainable supply chain is not just good for the planet—it's good for business. Consumers are increasingly favoring eco-friendly brands, and efficient practices often lead to cost savings. Here are five strategies we recommend at Ivora Solutions to build a greener supply chain.</p>

<h3 class="font-bold text-xl my-4">1. Optimize Transportation</h3>
<p>This includes route optimization to reduce fuel consumption, using alternative fuels, and consolidating shipments to ensure trucks are always full. Every mile saved is a win for the environment and your bottom line.</p>

<h3 class="font-bold text-xl my-4">2. Embrace Green Warehousing</h3>
<p>From using solar panels to power facilities to implementing energy-efficient lighting and water-saving measures, green warehouses can drastically reduce their environmental impact.</p>

<h3 class="font-bold text-xl my-4">3. Reduce and Recycle Packaging</h3>
<p>Minimizing packaging materials, using recycled content, and designing packaging for easy reuse or recycling are crucial steps. This not only reduces waste but can also lower material costs.</p>

<h3 class="font-bold text-xl my-4">4. Partner with Sustainable Suppliers</h3>
<p>Your supply chain is only as strong as its weakest link. Work with suppliers who share your commitment to sustainability. This creates a ripple effect of positive change throughout the industry.</p>

<h3 class="font-bold text-xl my-4">5. Leverage Technology for Transparency</h3>
<p>Use technology to track and measure your environmental impact. This data is essential for identifying areas for improvement and for transparently communicating your sustainability efforts to your customers.</p>
`
  },
    {
    id: '3',
    title: 'Cracking the Code of Last-Mile Delivery',
    author: 'Emily White, Distribution Manager',
    date: 'July 5, 2024',
    excerpt: 'The final step of the delivery process is often the most complex and expensive. We dive into the challenges of last-mile delivery and explore innovative solutions to optimize it for speed and cost-effectiveness.',
    content: `
<p>The last mile of delivery—the journey from a distribution center to the customer's doorstep—is a critical touchpoint. It's also the most challenging and costly part of the entire logistics process. Here's how we at Ivora Solutions are tackling this complex puzzle.</p>

<h3 class="font-bold text-xl my-4">The Urban Challenge</h3>
<p>Dense urban environments present unique obstacles, including traffic congestion, parking restrictions, and a high volume of individual deliveries. This is where micro-fulfillment centers and innovative delivery methods come into play.</p>

<h3 class="font-bold text-xl my-4">Technology as a Solution</h3>
<p>Our AI-powered routing software is essential for navigating these challenges. It provides drivers with the most efficient routes in real-time, adapting to changing conditions on the ground. Furthermore, providing customers with real-time tracking and flexible delivery options significantly improves the customer experience.</p>

<h3 class="font-bold text-xl my-4">Innovative Delivery Models</h3>
<p>We are exploring various models to enhance last-mile efficiency, including:
<ul>
  <li class="ml-4 list-disc"><strong>Locker Systems:</strong> Secure lockers in convenient locations allow customers to pick up packages at their leisure.</li>
  <li class="ml-4 list-disc"><strong>Crowdsourced Delivery:</strong> Leveraging a network of local, independent drivers can provide flexibility during peak demand.</li>
  <li class="ml-4 list-disc"><strong>Electric Vehicles (EVs):</strong> For urban deliveries, EVs reduce both carbon emissions and operational noise.</li>
</ul>
</p>

<h3 class="font-bold text-xl my-4">A Customer-Centric Approach</h3>
<p>Ultimately, the goal of last-mile delivery is a satisfied customer. By offering speed, reliability, and transparency, we turn the final step of the supply chain into a lasting positive impression for your brand.</p>
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
      alt: imagePlaceholder?.description || 'Blog post image',
      hint: imagePlaceholder?.imageHint || 'blog post'
    }
  };
});
