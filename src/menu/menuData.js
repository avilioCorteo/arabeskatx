/* =====================================================
   ARABESKA — Real menu data (scraped from arabeskatx.com)
   Shared by the menu pages and the single-item detail page.
   Each item carries a stable `id` slug used in /item.html?menu=…&id=…
   ===================================================== */

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/* Attach an `id` to every item (slug of its name), de-duplicating
   collisions within a menu by suffixing the section slug. */
function withIds(menu) {
  const seen = new Set()
  menu.sections.forEach((section) => {
    section.items.forEach((item) => {
      let id = slug(item.name)
      if (seen.has(id)) id = `${id}-${slug(section.name)}`
      seen.add(id)
      item.id = id
      item.section = section.name
    })
  })
  return menu
}

export const hookahMenu = withIds({
  key: 'hookah',
  title: 'Hookah',
  file: '/hookah-menu.html',
  image: '/images/hookah.png',
  eyebrow: 'Premium Experience',
  tagline: 'Finest tobaccos, perfectly blended to deliver rich flavor and smooth clouds.',
  flavorsLabel: 'Our Flavors',
  sections: [
    {
      name: 'House-Mixes',
      note: '$29',
      items: [
        { name: 'Noor Jahan', price: '$29', desc: 'Our signature hookah — a smooth, aromatic house blend crafted to perfection.', popular: true, image: '/images/menu/hookah/noor-jahan.jpg' },
        { name: 'Maddie', price: '$29', desc: 'A signature Arabeska house blend, layered and smooth.', popular: true, image: '/images/menu/hookah/maddie.jpg' },
        { name: "Magician's Paan", price: '$29', desc: 'Sweet paan-inspired house mix with a cooling finish.', image: '/images/menu/hookah/magicians-paan.jpg' },
        { name: 'Paan Dews', price: '$29', desc: 'Paan and melon-dew notes blended for a refreshing draw.', image: '/images/menu/hookah/paan-dews.jpg' },
        { name: 'Dragon Heart', price: '$29', desc: 'Bold fruit-forward house blend with a warm core.', image: '/images/menu/hookah/dragon-heart.jpg' },
        { name: 'Love is In the Air', price: '$29', desc: 'Floral and fruity house mix, light and aromatic.', image: '/images/menu/hookah/love-is-in-the-air.jpg' },
        { name: 'Island Breeze', price: '$29', desc: 'Tropical house blend, crisp and breezy.', image: '/images/menu/hookah/island-breeze.jpg' },
      ],
    },
    {
      name: 'Premium House Mixes',
      note: '$35',
      items: [
        { name: 'Al Pacino', price: '$35', desc: 'Rich premium blend with deep, layered character.', popular: true, image: '/images/menu/hookah/al-pacino.jpg' },
        { name: 'Jet Fuel Hookah', price: '$35', desc: 'High-octane premium mix with an intense finish.', image: '/images/menu/hookah/jet-fuel-hookah.jpg' },
        { name: 'Rings Of Fire', price: '$35', desc: 'Spiced-sweet premium blend with a fiery edge.', image: '/images/menu/hookah/rings-of-fire.jpg' },
        { name: 'Black Ice', price: '$35', desc: 'Dark fruit and frost — cool, smooth, premium.', image: '/images/menu/hookah/black-ice.jpg' },
      ],
    },
    {
      name: 'Traditional Swag',
      note: '2 flavors · $25',
      items: [
        { name: 'Mango', price: '$25', desc: 'Sweet, juicy mango with a clean tropical finish.', image: '/images/menu/hookah/mango.jpg' },
        { name: 'Watermelon', price: '$25', desc: 'Fresh watermelon, light and refreshing.', image: '/images/menu/hookah/watermelon.jpg' },
        { name: 'Peach', price: '$25', desc: 'Soft, ripe peach with a mellow sweetness.', image: '/images/menu/hookah/peach.jpg' },
        { name: 'Orange', price: '$25', desc: 'Bright citrus orange, zesty and smooth.', image: '/images/menu/hookah/orange.jpg' },
        { name: 'Mint', price: '$25', desc: 'Cool, crisp mint for a clean, icy draw.', image: '/images/menu/hookah/mint.jpg' },
        { name: 'Grape', price: '$25', desc: 'Deep grape sweetness, rounded and smooth.', image: '/images/menu/hookah/grape.jpg' },
        { name: 'Double Apple', price: '$25', desc: 'Traditional double-apple with a subtle anise note.', image: '/images/menu/hookah/double-apple.jpg' },
      ],
    },
    {
      name: 'Stabuzz',
      items: [
        { name: 'Irish Peach', price: '$29', desc: 'Stabuzz peach blend with a smooth, sweet profile.', image: '/images/menu/hookah/irish-peach.jpg' },
        { name: 'Safari Melon Dew', price: '$29', desc: 'Melon-dew medley, juicy and refreshing.', image: '/images/menu/hookah/safari-melon-dew.jpg' },
        { name: 'Blue Mist', price: '$29', desc: 'Cool blueberry mist, soft and breezy.', image: '/images/menu/hookah/blue-mist.jpg' },
      ],
    },
    {
      name: 'Fumari',
      items: [
        { name: 'Red Gummy Bear', price: '$29', desc: 'Sweet candied red-berry gummy flavor.', image: '/images/menu/hookah/red-gummy-bear.jpg' },
        { name: 'White Gummy Bear', price: '$29', desc: 'Classic white-gummy candy sweetness.', image: '/images/menu/hookah/white-gummy-bear.jpg' },
        { name: 'French Vanilla', price: '$29', desc: 'Smooth, creamy French vanilla.', image: '/images/menu/hookah/french-vanilla.jpg' },
        { name: 'Ambrosia', price: '$29', desc: 'Fruity-citrus Fumari signature blend.', image: '/images/menu/hookah/ambrosia.jpg' },
      ],
    },
    {
      name: 'Afzal',
      items: [
        { name: 'Lychee', price: '$29', desc: 'Sweet, floral lychee with a clean finish.', image: '/images/menu/hookah/lychee.jpg' },
        { name: 'Chief Commissioner', price: '$29', desc: 'Bold signature Afzal blend.', image: '/images/menu/hookah/chief-commissioner.jpg' },
        { name: 'Paan Raas', price: '$29', desc: 'Traditional paan-raas with sweet spice.', image: '/images/menu/hookah/paan-raas.jpg' },
      ],
    },
    {
      name: 'Adalya',
      items: [
        { name: 'Mi Amor', price: '$29', desc: 'Fruity Adalya blend, smooth and sweet.', image: '/images/menu/hookah/mi-amor.jpg' },
        { name: 'Sky Fall', price: '$29', desc: 'Cool mixed-fruit Adalya signature.', image: '/images/menu/hookah/sky-fall.jpg' },
        { name: 'Madagascar', price: '$29', desc: 'Exotic tropical Adalya blend.', image: '/images/menu/hookah/madagascar.jpg' },
        { name: 'Blue Dragon', price: '$29', desc: 'Blueberry-forward with a fruity edge.', image: '/images/menu/hookah/blue-dragon.jpg' },
        { name: 'Love 66', price: '$29', desc: 'Fan-favorite fruity Adalya mix.', popular: true, image: '/images/menu/hookah/love-66.jpg' },
        { name: 'Lady Killer', price: '$29', desc: 'Bold, sweet, layered Adalya blend.', image: '/images/menu/hookah/lady-killer.jpg' },
      ],
    },
    {
      name: 'Upgrades',
      items: [
        { name: 'Head Refill', price: '$10', desc: 'Fresh bowl refill to keep the session going.', image: '/images/menu/hookah/head-refill.jpg' },
        { name: 'Mango Base', price: '$4', desc: 'Swap the water base for fresh mango.', image: '/images/menu/hookah/mango-base.jpg' },
        { name: 'Ice Base', price: '$4', desc: 'Chill the base with ice for an extra-cool draw.', image: '/images/menu/hookah/ice-base.jpg' },
      ],
    },
  ],
})

export const foodMenu = withIds({
  key: 'food',
  title: 'Food',
  file: '/food-menu.html',
  image: '/images/burger.png',
  eyebrow: 'Kitchen Favorites',
  tagline: 'Smash burgers, shawarma & signature bites, made fresh to order.',
  flavorsLabel: 'Our Kitchen',
  sections: [
    {
      name: 'Appetizers',
      items: [
        { name: 'Masala Fries', price: '$7', desc: 'Golden, crispy potato fries lightly seasoned with salt and fried to a perfect crunch.', image: '/images/menu/food/masala-fries.jpg' },
        { name: 'Chicken Tenders', price: '$9', desc: 'Juicy strips of chicken breast, lightly coated and fried for a crispy, tender bite.', image: '/images/menu/food/chicken-tenders.jpg' },
        { name: 'Hummus', price: '$7', desc: 'Creamy chickpea purée blended with tahini, garlic, lemon juice, and olive oil for a smooth, rich flavor.', image: '/images/menu/food/hummus.jpg' },
        { name: 'Falafel', price: '$7', desc: 'Golden fried chickpea patties blended with fresh herbs and spices for a crisp, savory bite.', image: '/images/menu/food/falafel.jpg' },
        { name: 'Chicken Wings (6 Pcs)', price: '$14', desc: 'Crispy fried wings tossed in your choice of signature sauce, served hot and flavorful.', popular: true, image: '/images/menu/food/chicken-wings-6-pcs.jpg' },
        { name: 'Egg Roll (4 Pcs)', price: '$7', desc: 'Crispy, golden spring rolls filled with egg and vegetables, served fresh and flavorful.', image: '/images/menu/food/egg-roll-4-pcs.jpg' },
        { name: 'Veg Samosas', price: '$4', desc: 'Crisp pastry pockets filled with spiced potatoes and peas, served warm with a flavorful finish.', image: '/images/menu/food/veg-samosas.jpg' },
      ],
    },
    {
      name: 'Wraps & Sandwiches',
      items: [
        { name: 'Chicken Shawarma', price: '$12', desc: 'Marinated chicken roasted to tenderness, served with fresh vegetables and house garlic sauce.', popular: true, image: '/images/menu/food/chicken-shawarma.jpg' },
        { name: 'Beef Shawarma', price: '$14', desc: 'Marinated beef slices slow-roasted to tenderness, served with fresh vegetables and house garlic sauce.', image: '/images/menu/food/beef-shawarma.jpg' },
        { name: 'Falafel Wrap', price: '$11', desc: 'Crispy falafel wrapped with fresh vegetables and house tahini sauce in warm pita.', image: '/images/menu/food/falafel-wrap.jpg' },
        { name: 'Gyro Wrap', price: '$14', desc: 'Seasoned meat wrapped with fresh vegetables and house-made sauce in warm pita.', image: '/images/menu/food/gyro-wrap.jpg' },
      ],
    },
    {
      name: 'Platters',
      items: [
        { name: 'Lamb Chops (5 Pcs)', price: '$29', desc: 'Tender, seasoned lamb chops grilled to perfection, offering a rich and flavorful dining experience.', image: '/images/menu/food/lamb-chops-5-pcs.jpg' },
        { name: 'Tandoori Chicken', price: '$18', desc: 'Chicken marinated in traditional tandoori spices and slow-cooked for a smoky, flavorful finish.', image: '/images/menu/food/tandoori-chicken.jpg' },
        { name: 'Falafel', price: '$15', desc: 'Golden fried chickpea patties blended with fresh herbs and spices for a crisp, savory bite.', image: '/images/menu/food/falafel-platters.jpg' },
        { name: 'Beef Shish Kabob', price: '$21', desc: 'Seasoned beef skewers grilled to tenderness, offering a rich and flavorful bite.', image: '/images/menu/food/beef-shish-kabob.jpg' },
        { name: 'Beef Kabob', price: '$23', desc: 'Marinated beef grilled to a tender finish, delivering a rich and balanced flavor.', image: '/images/menu/food/beef-kabob.jpg' },
        { name: 'Chicken Shish Tawook', price: '$18', desc: 'Marinated chicken skewers grilled to tenderness, served with a clean and flavorful finish.', image: '/images/menu/food/chicken-shish-tawook.jpg' },
        { name: 'Chicken Kabob', price: '$19', desc: 'Marinated chicken grilled to a juicy, tender finish, offering a balanced and flavorful bite.', image: '/images/menu/food/chicken-kabob.jpg' },
      ],
    },
    {
      name: 'Burgers',
      items: [
        { name: 'Cheeseburger', price: '$15', desc: 'Grilled beef patty topped with melted cheese, served with fresh lettuce, tomato, and house sauce.', image: '/images/menu/food/cheeseburger.jpg' },
        { name: 'Zinger Burger', price: '$14', desc: 'Crispy, seasoned chicken fillet layered with fresh lettuce and house sauce on a toasted bun.', image: '/images/menu/food/zinger-burger.jpg' },
        { name: 'Smash Burger', price: '$16', desc: 'Fresh beef patty smashed and seared for a crisp edge, topped with cheese and house sauce.', popular: true, image: '/images/menu/food/smash-burger.jpg' },
      ],
    },
    {
      name: 'Salads',
      items: [
        { name: 'Fatoush Salad', price: '$7', desc: 'Fresh mixed greens tossed with tomatoes, cucumbers, and crisp pita chips, finished with a light, tangy dressing.', image: '/images/menu/food/fatoush-salad.jpg' },
        { name: 'Greek Salad', price: '$7', desc: 'Fresh lettuce, tomatoes, cucumbers, olives, and feta cheese, tossed in a light Mediterranean dressing.', image: '/images/menu/food/greek-salad.jpg' },
      ],
    },
    {
      name: 'Desserts',
      items: [
        { name: 'Strawberry Cheesecake', price: '$7', desc: 'Rich, creamy cheesecake topped with luscious strawberry flavor, finished with a smooth, velvety texture.', image: '/images/menu/food/strawberry-cheesecake.jpg' },
        { name: 'Chocolate Mousse Cake', price: '$7', desc: 'Decadent chocolate mousse cake layered with rich, velvety chocolate and finished with smooth, airy texture.', image: '/images/menu/food/chocolate-mousse-cake.jpg' },
        { name: 'Gulab Jamun with Ice Cream', price: '$7', desc: 'Warm, soft gulab jamun paired with chilled vanilla ice cream for a rich and comforting dessert experience.', image: '/images/menu/food/gulab-jamun-with-ice-cream.jpg' },
      ],
    },
  ],
})

export const drinksMenu = withIds({
  key: 'drinks',
  title: 'Drinks',
  file: '/drinks-menu.html',
  image: '/images/mojito.png',
  eyebrow: 'Handcrafted & Chilled',
  tagline: 'Fresh-made mojitos, lassis & mocktails, served ice-cold.',
  flavorsLabel: 'Our Drinks',
  sections: [
    {
      name: 'Mojitos',
      items: [
        { name: 'Virgin Mojito', price: '$8', desc: 'Fresh mint and lemon muddled with sparkling soda, served chilled for a crisp, cool, and refreshing experience.', popular: true, image: '/images/menu/drinks/virgin-mojito.jpg' },
        { name: 'Guava Mojito', price: '$8', desc: 'Fresh guava muddled with mint and lemon, served chilled for a smooth, tropical, and refreshing drink.', image: '/images/menu/drinks/guava-mojito.jpg' },
        { name: 'Strawberry Mojito', price: '$8', desc: 'Fresh strawberries muddled with mint and lemon, served chilled for a light and refreshing beverage.', image: '/images/menu/drinks/strawberry-mojito.jpg' },
        { name: 'Mango Mojito', price: '$8', desc: 'Fresh mango blended with mint and citrus, served chilled for a smooth, tropical refreshment.', image: '/images/menu/drinks/mango-mojito.jpg' },
      ],
    },
    {
      name: 'Soda & Juices',
      items: [
        { name: 'Specialty Soda', price: '$4', desc: 'Fizzy fruit-flavored sodas like Vimto and Mirinda with vibrant, sweet-tangy notes.', image: '/images/menu/drinks/specialty-soda.jpg' },
        { name: 'Soda', price: '$3', desc: 'Chilled, fizzy soft drinks served over ice for a crisp, bubbly, and refreshing taste.', image: '/images/menu/drinks/soda.jpg' },
        { name: 'Ozarka', price: '$2', desc: 'Pure, crisp bottled spring water, served chilled for clean, refreshing hydration.', image: '/images/menu/drinks/ozarka.jpg' },
        { name: 'Barbican', price: '$4', desc: 'Non-alcoholic malt beverage served chilled for a crisp and refreshing taste.', image: '/images/menu/drinks/barbican.jpg' },
      ],
    },
    {
      name: 'Lassi & Slushies',
      items: [
        { name: 'Nutella Milkshake', price: '$9', desc: 'Creamy Nutella blended with milk and ice cream, served chilled for a rich, smooth, chocolate-hazelnut treat.', image: '/images/menu/drinks/nutella-milkshake.jpg' },
        { name: 'Chocolate Milkshake', price: '$9', desc: 'Rich chocolate blended with creamy milk and ice cream, served chilled for a thick, smooth indulgence.', image: '/images/menu/drinks/chocolate-milkshake.jpg' },
        { name: 'Sweet Lassi', price: '$8', desc: 'Creamy yogurt blended with sugar and a hint of cardamom, served chilled for a smooth refreshment.', image: '/images/menu/drinks/sweet-lassi.jpg' },
        { name: 'Mango Lassi', price: '$9', desc: 'Smooth yogurt blended with sweet mango for a rich, creamy, and refreshing drink.', popular: true, image: '/images/menu/drinks/mango-lassi.jpg' },
        { name: 'Piña Colada', price: '$10', desc: 'A smooth blend of pineapple and coconut, served chilled for a creamy, tropical refreshment.', image: '/images/menu/drinks/pina-colada.jpg' },
        { name: 'Strawberry Milkshake', price: '$9', desc: 'Creamy blend of fresh strawberries and milk, served chilled for a smooth and refreshing treat.', image: '/images/menu/drinks/strawberry-milkshake.jpg' },
        { name: 'Mint Lemonade', price: '$7', desc: 'Fresh mint blended with zesty lemon for a cool, refreshing drink.', image: '/images/menu/drinks/mint-lemonade.jpg' },
      ],
    },
    {
      name: 'Hot Drinks',
      items: [
        { name: 'Mint Tea Pot', price: '$9', desc: 'Loose mint leaves gently steeped and served in a tea pot, offering a warm, refreshing, aromatic experience.', image: '/images/menu/drinks/mint-tea-pot.jpg' },
        { name: 'Mint Tea', price: '$3', desc: 'Fresh mint leaves brewed in hot water for a soothing and aromatic tea experience.', image: '/images/menu/drinks/mint-tea.jpg' },
        { name: 'Espresso', price: '$4', desc: 'Rich, concentrated coffee brewed to a bold and intense flavor for a classic energizing sip.', image: '/images/menu/drinks/espresso.jpg' },
        { name: 'Café Latte', price: '$6', desc: 'A smooth, creamy coffee made with rich espresso and steamed milk, topped with milk foam (Hazelnut or Vanilla).', image: '/images/menu/drinks/cafe-latte.jpg' },
      ],
    },
  ],
})

export const MENUS = {
  hookah: hookahMenu,
  food: foodMenu,
  drinks: drinksMenu,
}

/** Look up a single item across a menu by key + item id. */
export function findItem(menuKey, itemId) {
  const menu = MENUS[menuKey]
  if (!menu) return null
  for (const section of menu.sections) {
    const item = section.items.find((it) => it.id === itemId)
    if (item) return { menu, item }
  }
  return null
}
