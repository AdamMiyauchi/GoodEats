--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-4.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: creates; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."creates" (
    "recipe_id" integer NOT NULL,
    "username" "text" NOT NULL
);


ALTER TABLE public.creates OWNER TO ztktpaolkllvqd;

--
-- Name: equipment; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."equipment" (
    "tool_name" "text" NOT NULL,
    "measurement_type" "text"
);


ALTER TABLE public.equipment OWNER TO ztktpaolkllvqd;

--
-- Name: have; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."have" (
    "recipe_id" integer NOT NULL,
    "ingredient_id" integer NOT NULL,
    "unit" "text",
    "amount" double precision
);


ALTER TABLE public.have OWNER TO ztktpaolkllvqd;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."ingredient" (
    "ingredient_name" "text" NOT NULL,
    "ingredient_id" integer NOT NULL
);


ALTER TABLE public.ingredient OWNER TO ztktpaolkllvqd;

--
-- Name: rating; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."rating" (
    "recipe_id" integer NOT NULL,
    "username" "text" NOT NULL,
    "score" integer
);


ALTER TABLE public.rating OWNER TO ztktpaolkllvqd;

--
-- Name: recipe; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."recipe" (
    "recipe_id" integer NOT NULL,
    "healthy" boolean,
    "image" "text",
    "category" "text",
    "recipe_name" "text",
    "directions" "text",
    "difficulty" integer,
    "prep_time" integer
);


ALTER TABLE public.recipe OWNER TO ztktpaolkllvqd;

--
-- Name: require; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."require" (
    "tool_name" "text" NOT NULL,
    "recipe_id" integer NOT NULL
);


ALTER TABLE public.require OWNER TO ztktpaolkllvqd;

--
-- Name: user_profile; Type: TABLE; Schema: public; Owner: ztktpaolkllvqd
--

CREATE TABLE "public"."user_profile" (
    "username" "text" NOT NULL,
    "password" "text"
);


ALTER TABLE public.user_profile OWNER TO ztktpaolkllvqd;

--
-- Data for Name: creates; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."creates" ("recipe_id", "username") FROM stdin;
1	robert
2	john
3	michael
4	william
5	david
6	richard
7	joseph
8	thomas
9	charles
10	christopher
11	daniel
12	matthew
13	anthony
14	mark
15	donald
16	steven
17	paul
18	andrew
19	joshua
20	kenneth
21	kevin
22	brian
23	george
24	edward
25	ronald
26	qwer
\.


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."equipment" ("tool_name", "measurement_type") FROM stdin;
measuring cup	cups
bowl	NULL
teaspoon	teaspoons
tablespoon	tablespoons
blender	NULL
food scale	NULL
thermometer	fahrenheit
syringe	milliliters
knife	NULL
pan	NULL
baking sheet	NULL
pot	NULL
rolling pin	NULL
mixer	NULL
grill	NULL
brush	NULL
roller	\N
\.


--
-- Data for Name: have; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."have" ("recipe_id", "ingredient_id", "unit", "amount") FROM stdin;
1	1	cup	0.25
1	2	cup	0.25
1	3	slice	2
2	47	count	2
2	24	cup	0.75
3	22	count	2
3	4	pinch	1
4	8	teaspoon	2
4	4	pinch	1
4	21	tablespoon	2
4	30	count	10
5	9	cup	0.5
6	16	pound	2
6	31	cup	1
6	32	cup	0.5
7	13	cup	1
7	22	count	1
7	20	cup	1
7	6	tablespoon	3
8	32	cup	1
8	22	count	1
8	21	cups	0.5
8	46	teaspoon	1.5
8	13	cup	1.5
9	1	cup	1
9	6	cup	0.5
9	22	count	1
10	20	cup	5
10	24	cup	2
10	55	cup	2
11	58	cup	2.5
11	23	count	3
11	13	cup	1
12	22	count	2
12	19	teaspoon	1
13	22	count	2
13	7	teaspoon	1
14	32	cup	0.5
14	4	teaspoon	1
14	5	teaspoon	1
15	20	cups	2
15	53	count	1
15	54	cups	0.25
16	56	cups	2
16	53	count	1
16	57	count	1
17	40	cup	4
17	29	cup	0.5
17	4	teaspoon	0.25
17	5	teaspoon	0.25
17	10	cup	1
18	36	pound	1.5
18	35	teaspoon	1
18	37	tablespoon	2
19	33	cup	1
19	43	teaspoon	1
19	44	teaspoon	0.25
19	8	tablespoon	1
19	45	tablespoon	1
20	52	cup	1
20	50	count	6
20	51	count	3
21	22	count	8
21	34	teaspoon	0.25
21	4	teaspoon	0.25
21	5	teaspoon	0.25
21	10	cup	0.5
21	11	teaspoon	1
22	16	count	1
22	48	cup	2
22	49	cup	2
23	38	pounds	4
23	39	count 	1
23	23	cup	1
24	22	count 	8
24	11	tablespoon	3
24	42	teaspoon	1
24	4	teaspoon	0.25
24	5	teaspoon	0.25
25	33	cup	1
25	43	teaspoon	1
25	46	teaspoon	0.25
25	8	tablespoon	1
25	45	tablespoon	1
26	59	1 cup	0
26	60	1 cup	0
26	61	1 s	0
\.


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."ingredient" ("ingredient_name", "ingredient_id") FROM stdin;
peanut buuter	1
jelly	2
bread	3
salt	4
pepper	5
suger	6
vinegar	7
honey	8
ketchup	9
mayonnaise	10
mustard	11
rice	12
flour	13
corn	14
beef	15
chicken	16
pork	17
fish	18
oil	19
milk	20
butter	21
egg	22
cream	23
cheese	24
baking powder	25
lemon	26
chili	27
coriander	28
celery	29
carrot	30
soy sauce	31
brown sugar	32
water	33
paprika	34
cardomom	35
salmon	36
maple syrup	37
tomato	38
onion	39
cooked chicken	40
ham	41
sweet pickle juice	42
aniseed	43
ginger	44
lemon juice	45
cinnamon	46
tortilla	47
bbq sauce	48
bread crump	49
bacon	50
jalapeno	51
cream cheese	52
bannana	53
oats	54
macaroni	55
chocolate milk	56
avacado	57
chocolate	58
dough	59
red sauce	60
a b c	61
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."rating" ("recipe_id", "username", "score") FROM stdin;
1	robert	5
2	john	5
3	michael	2
4	william	4
5	david	4
6	richard	3
7	joseph	2
8	thomas	5
9	charles	4
10	christopher	1
11	daniel	4
12	matthew	3
13	anthony	5
14	mark	5
15	donald	3
16	steven	3
17	paul	3
18	andrew	4
19	joshua	5
20	kenneth	0
21	kevin	4
22	brian	1
23	george	3
24	edward	4
25	ronald	5
1	qwer	5
2	qwer	1
3	qwer	5
4	qwer	4
16	qwer	4
5	qwer	1
\.


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."recipe" ("recipe_id", "healthy", "image", "category", "recipe_name", "directions", "difficulty", "prep_time") FROM stdin;
1	f	https://cdn.tasteatlas.com/images/dishes/906bcef37f934f76900b50b1e7959236.jpg	sandwich	peanut butter and jelly sandwich	step 1: gather your ingredients for the sandwich; step 2: pull out two slices of bread; step 3: spread the peanut butter onto bread; step 4: combine the two slices	1	5
2	f	https://images-gmi-pmc.edge-generalmills.com/9522c8dc-24c7-4ba6-b3e8-81cc3ff22f4c.jpg	sandwich	quesadilla	step 1: gather ingredients (cheese and tortilla); step 2: heat up pan on stove; step 3: put cheese in between one tortilla; step 4: place tortilla on pan and heat both sides	1	6
3	t	https://meljoulwan.com/wp-content/uploads/2012/06/egg1.jpg	breakfast	over easy eggs	step 1: put eggs in skillet; step 2: cook until whites are opaque; step 3: season with salt; step 4: enjoy!	2	7
4	t	https://oursaltykitchen.com/wp-content/uploads/2020/09/honey-roasted-carrots-1.jpg	vegetable	honey roasted carrots	step 1: preheat oven to 400 degrees; step 2: coat carrots in butter honey and salt; step 3: bake for 30 minutes	2	45
5	f	https://www.simplyrecipes.com/thmb/jm-oriwoxtkxsuodt8gtou06w40=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/simply-recipes-homemade-pizza-lead-3-8aa37af554cf4445a1e3e54fdc66e974.jpg	pizza	homemade pizza	step 1: preheat the oven to 500 degrees; step 2: make the sauce with prepared ingredients; step 3: roll out the dough; step 4: add the sauce and the toppings to the rolled out dough; step 5: cook the pizza in the oven for 12-14 minutes; step 6: slice up the finished pizza and serve.	3	25
6	t	https://www.cookingclassy.com/wp-content/uploads/2018/04/teriyaki-chicken-15.jpg	asian	teriyaki chicken	step 1: sear the chicken in a pan; step 2: add the soy sauce brown sugar; step 3: cook until the chicken is cooked through; step 4: enjoy!	3	30
7	f	https://static01.nyt.com/images/2017/03/24/dining/24cooking-classicpancakes/24cooking-classicpancakes-articlelarge.jpg	breakfast	pancakes	step 1: mix flour milk sugar eggs in single bowl; step 2: preheat griddle; step 3: place 1 cup of mixture on hot griddle flip over when one side is cooked golden brown; step 4: repeat step 3 until all batter is gone	2	30
8	f	https://www.eatwell101.com/wp-content/uploads/2018/09/cinnamon-cookies.jpg	dessert	cinnamon cookies	step 1: combine flour milk sugar eggs cinnamon in single bowl; step 2: place balls of mixture on pan; step 3: preheat oven to 350 degrees; step 4: bake for 10-15 minutes	2	30
9	f	https://www.cookingclassy.com/wp-content/uploads/2017/07/peanut-butter-cookies-17.jpg	dessert	3 ingredient peanut butter cookies	step 1: in a bowl mix together peanut butter sugar and egg; step 2: form into dough into balls and place evenly spaced on a cookie sheet; step 3: bake for 10 minutes; step 4: enjoy!	2	30
10	f	https://www.thechunkychef.com/wp-content/uploads/2018/02/ultimate-creamy-baked-mac-and-cheese-baking-dish.jpg	pasta	mac and cheese	step 1: boil 5 cups of milk in pot; step 2: add pasta into pot and mix for 10 minutes; step 3: add shredded cheddar cheese; step 4: mix until evenly mixed	2	30
11	f	https://www.inspiredtaste.net/wp-content/uploads/2016/06/brownies-recipe-2-1200.jpg	dessert	brownies	step 1: preheat oven to 350 degrees; step 2: mix chocolate spread eggs flour in one bowl; step 3: transfer mix to square baking container; step 4: place in oven for 15 minutes take out when finished	2	35
12	t	https://www.jessicagavin.com/wp-content/uploads/2020/09/how-to-fry-an-egg-3-1200.jpg	breakfast	fried eggs	step 1: put a little bit of olive oil in a pan and bring the heat to medium for about 5 minutes; step 2: crack 1 to 3 eggs into the pan with the oil and cook until the whites of the egg settle; step 3: while you are doing this baste the egg whites with the oil but be careful not to baste the yolks; step 4: after a couple minutes take off the heat and enjoy!	1	6
13	t	https://www.the-girl-who-ate-everything.com/wp-content/uploads/2011/04/how-to-hard-boil-eggs-15-735x977.jpg	snacks	hard-boiled eggs	step 1: bring a pot of water to a boil; step 2: place however many eggs you want into the boiling water with a little bit of vinegar; step 3: give the eggs about 12 to 16 minutes depending on how solid you want the yolk to be; step 4: remove the pot from the heat and run cold water over the eggs; step 5: let them sit a bit before enjoying!	1	16
14	t	https://www.recipetineats.com/wp-content/uploads/2019/07/cheffy-garlic-butter-steak_7.jpg	meat	steak	step 1: marinate the steak in a mixture of salt pepper and soy sauce overnight; step 2: start up the grill; step 3: put the steak on the grill and give it about 5 minutes a side; step 4: let sit a bit before you enjoy!	2	15
15	t	https://www.wellplated.com/wp-content/uploads/2019/01/breakfast-oatmeal-smoothie.jpg	drinks	banana oat smoothie	step 1: add oats and blend until the grains are the size of a fine crumb; step 2: add a banana and milk to the mixture and blend together; step 3: pour into a glass and enjoy!	1	6
16	t	https://www.texanerin.com/content/uploads/2013/04/chocolate-avocado-smoothie-image-650x975.jpeg	drinks	chocolate avocado smoothie	step 1: add avocado banana and chocolate milk to a blender and blend until smooth; step 2: pour into a glass and enjoy!	1	6
17	t	https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/05/chicken-salad-5.jpg	salad	chicken salad	step 1: chopped finely with chicken and celery; step 2: mix chicken salt pepper mayonnaise and celery together in a large serving bowl.	2	15
18	t	https://www.simplywhisked.com/wp-content/uploads/2020/03/maple-glazed-salmon-1.jpg	fish	maple salmon	step 1: preheat oven to 275; step 2: place salmon on baking sheet and brush with maple syrup and cardamom; step 3: cook salmon for 25 minutes; step 4: enjoy!	3	35
19	t	https://images-gmi-pmc.edge-generalmills.com/e1a63d5a-b02f-4fed-aca2-eeaf9c898a22.jpg	drinks	aniseed ginger tea	step 1: combine all ingredients in small pan; step 2: bring to boil lower heat simmer for 5 minutes; step 3: strain; step 4: serve hot in cups.	1	15
20	f	https://therecipecritic.com/wp-content/uploads/2019/11/jalapeno_poppers_hero.jpg	vegetable	jalapeno poppers 	step 1: prehead oven to 400 degrees; step 2: slice jalapenos in half; step 3: spread cream cheese on each half; step 4: wrap each in bacon; step 5: place jalapenos on baking pan; step 6: bake for 20 min	3	45
21	f	https://therecipecritic.com/wp-content/uploads/2019/02/besteggsalad.jpg	salad	egg salad	step 1: place egg in a pan and cover with cold water; step 2: bring water to a boil and immediately remove from heat; step 3: cover and let eggs stand in hot water for 10 to 12 minutes; step 4: remove from hot water cool peel and chop; step 5: place the chopped eggs in a bowl and stir in the mayonnaise and mustard; step 6: season with salt pepper and paprika.	2	15
22	f	https://www.browniebites.net/wp-content/uploads/2021/10/baked-bbq-chicken-tenders-03.jpg	dinner	bbq chicken tenders	step 1: preheat oven to 375 degrees; step 2: slice checken into strips; step 3: dip strips in bbq sauce coat in bread crumps; step 4: place on baking sheet; step 5: place in oven for 15 minutes	3	35
23	t	https://www.inspiredtaste.net/wp-content/uploads/2016/08/tomato-soup-recipe-2-1200.jpg	soup	tomato soup	step 1: preheat oven to 400 degrees; step 2: roast tomotoes on a baking sheet for 1 hour or untill soft; step 3: in a pot cook onion until translucent; step 4: add tomatoes and cream to pot and simmer for 25 minutes; step 5: enjoy	4	120
24	f	https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/09/deviled-eggs-7-1.jpg	snacks	deviled egg	step 1: place egg in a pan and cover with cold water; step 2: bring water to a boil and immediately remove from heat; step 3: cover and let eggs stand in hot water for 10 to 12 minutes; step 4: slice eggs in half lengthwise remove yolks and mash; step 5: mix yolks mayonnaise and sweet pickle juice; step 6: fill whites with mixture using a spoon or pastry tube.	3	30
25	t	https://www.hintofhealthy.com/wp-content/uploads/2020/11/star-anise-tea-26.jpg	drinks	aniseed cinnamon tea	step 1: combine all ingredients in small pan; step 2: bring to boil lower heat simmer for 5 minutes; step 3: strain; step 4: serve hot in cups.	1	15
26	f	\N	candy	pizza	Step 0: open; Step 1: sesame;	0	25
\.


--
-- Data for Name: require; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."require" ("tool_name", "recipe_id") FROM stdin;
knife	1
pan	2
pan	3
baking sheet	4
rolling pin	5
baking sheet	5
pan	6
bowl	7
pan	7
bowl	8
baking sheet	9
bowl	9
pot	10
bowl	11
baking sheet	11
pan	12
pot	13
bowl	14
grill	14
blender	15
blender	16
bowl	17
baking sheet	18
brush	18
pot	19
knife	20
baking sheet	20
pot	21
bowl	21
baking sheet	22
baking sheet	23
pot	23
pot	24
bowl	24
pot	25
roller	26
knife	26
\.


--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: ztktpaolkllvqd
--

COPY "public"."user_profile" ("username", "password") FROM stdin;
robert	o53dbck3kk
john	panpf1j
michael	lf94eyt
william	gyf6129
david	o2tawjvti7
richard	bxs2s3m
joseph	w10r181
thomas	wkylpnp1yv
charles	pfvf173
christopher	pdpw10unn6
daniel	nl3n1jfg8y
matthew	5dbazld
anthony	7kmkr1g
mark	l681ajf
donald	xsewew7
steven	7pz3wijyjr
paul	r2asu1t
andrew	7xphc82
joshua	it1svddobu
kenneth	guw31t2
kevin	xxq15vyv4k
brian	9sggiu9
george	vsgqvwk
edward	oo1we26
ronald	7m0zq4r
sarah	vo2nr0zto6
karen	fkjhmmxait
nancy	de826qvkns
lisa	n1w3d9l
betty	vh0px7o
margaret	ehxtf4ihq3
sandra	g4d3ium
ashley	x450ao0
kimberly	kn8akt0
emily	szcok5k0e0
donna	mv7175uqhv
michelle	pw1e1kg
dorothy	8vz5xq9
carol	gchudkn
amanda	esi40wp8h9
melissa	oo555zp
deborah	vpa41f8
stephanie	edj5scm
rebecca	7l9u6svvbd
sharon	tv6hh74
laura	ax7m556
cynthia	99aax9v
kathleen	o83vf3n
amy	dw94eyf
shirley	kamw020
qwer	poiu
\.


--
-- Name: creates creates_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."creates"
    ADD CONSTRAINT "creates_pkey" PRIMARY KEY ("recipe_id");


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."equipment"
    ADD CONSTRAINT "equipment_pkey" PRIMARY KEY ("tool_name");


--
-- Name: have have_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."have"
    ADD CONSTRAINT "have_pkey" PRIMARY KEY ("recipe_id", "ingredient_id");


--
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."ingredient"
    ADD CONSTRAINT "ingredient_pkey" PRIMARY KEY ("ingredient_id");


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."rating"
    ADD CONSTRAINT "rating_pkey" PRIMARY KEY ("recipe_id", "username");


--
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."recipe"
    ADD CONSTRAINT "recipe_pkey" PRIMARY KEY ("recipe_id");


--
-- Name: require require_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."require"
    ADD CONSTRAINT "require_pkey" PRIMARY KEY ("tool_name", "recipe_id");


--
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("username");


--
-- Name: creates creates_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."creates"
    ADD CONSTRAINT "creates_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE CASCADE;


--
-- Name: creates creates_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."creates"
    ADD CONSTRAINT "creates_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."user_profile"("username") ON DELETE CASCADE;


--
-- Name: have have_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."have"
    ADD CONSTRAINT "have_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredient"("ingredient_id") ON DELETE CASCADE;


--
-- Name: have have_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."have"
    ADD CONSTRAINT "have_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE CASCADE;


--
-- Name: rating rating_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."rating"
    ADD CONSTRAINT "rating_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE CASCADE;


--
-- Name: rating rating_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."rating"
    ADD CONSTRAINT "rating_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."user_profile"("username") ON DELETE CASCADE;


--
-- Name: require require_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."require"
    ADD CONSTRAINT "require_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE CASCADE;


--
-- Name: require require_tool_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ztktpaolkllvqd
--

ALTER TABLE ONLY "public"."require"
    ADD CONSTRAINT "require_tool_name_fkey" FOREIGN KEY ("tool_name") REFERENCES "public"."equipment"("tool_name") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

