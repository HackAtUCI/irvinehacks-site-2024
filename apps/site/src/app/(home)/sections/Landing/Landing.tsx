"use client";

import Button from "@/components/Button/Button";
import styles from "./Landing.module.css";

import { View } from "@/components/canvas/View";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles, PerspectiveCamera } from "@react-three/drei";

const Landing = () => {
	return (
		<section className={styles.landingSection}>
			<View className="h-full w-full absolute">
				<Suspense fallback={null}>
					{/* <Stars
						radius={100}
						depth={50}
						count={5000}
						factor={4}
						saturation={0}
						fade
						speed={1}
					></Stars> */}
					<Fireflies/>

					<PerspectiveCamera
    				makeDefault
    			position={[
					0,
					0,
					.6
					]}
				/>
					
				</Suspense>
			</View>
			<div className={styles.landingGroup}>
				<h1 className="font-display">IrvineHacks 2024</h1>
				<p className="font-display">January 26&ndash;28</p>
				<Button
					text="Stay updated"
					href="https://uci.us13.list-manage.com/subscribe?u=5976872928cd5681fbaca89f6&id=93333e11eb"
				/>
			</div>
		</section>
	);
};

const Fireflies = () => {

	return (
		<>

			<Sparkles
							color="orange"
							count={100}
							noise={1}
							opacity={1}
							speed={0.3}
							size={(
								0.5060793161392212,
								2.4199981689453125,
								4.7787370681762695,
								3.6893203258514404,
								2.25410532951355,
								2.670276403427124,
								2.374255418777466,
								3.4126408100128174,
								4.4318952560424805,
								3.60624361038208,
								3.1159565448760986,
								3.3411238193511963,
								0.1044161319732666,
								3.262430429458618,
								1.3243125677108765,
								2.440800428390503,
								2.692298173904419,
								4.571378231048584,
								3.741450786590576,
								0.2505072057247162,
								1.6173772811889648,
								4.049655437469482,
								0.3294524848461151,
								0.9160524010658264,
								3.3010778427124023,
								4.2943806648254395,
								3.107447624206543,
								2.9960644245147705,
								2.056182384490967,
								2.822615623474121,
								3.692037582397461,
								4.153282642364502,
								1.8387819528579712,
								2.121147394180298,
								0.40831276774406433,
								2.383126735687256,
								2.205545425415039,
								2.504565954208374,
								1.1564998626708984,
								3.55126690864563,
								0.09390266984701157,
								0.16662879288196564,
								4.490508556365967,
								3.385791301727295,
								3.1175172328948975,
								4.595211505889893,
								0.17107276618480682,
								4.884709358215332,
								4.52973747253418,
								2.1367416381835938,
								0.10195884853601456,
								2.629635810852051,
								0.5618736743927002,
								4.941617488861084,
								1.1538593769073486,
								1.262843370437622,
								4.375873565673828,
								1.688683032989502,
								3.9133527278900146,
								3.276317834854126,
								0.953614354133606,
								2.4378554821014404,
								4.64397668838501,
								0.12958145141601562,
								2.3536739349365234,
								4.448606967926025,
								3.7263424396514893,
								4.0849409103393555,
								2.799133539199829,
								2.991407871246338,
								1.12977933883667,
								3.9851388931274414,
								1.8534866571426392,
								1.4554123878479004,
								1.277143120765686,
								2.462888479232788,
								4.695364952087402,
								3.752734899520874,
								3.4006259441375732,
								1.272702932357788,
								3.819554567337036,
								1.095497488975525,
								2.3996856212615967,
								1.2399526834487915,
								4.529360771179199,
								1.5870914459228516,
								2.127842903137207,
								1.4537944793701172,
								0.6043626070022583,
								3.5439579486846924,
								0.20899750292301178,
								3.0012423992156982,
								1.4123945236206055,
								1.3441721200942993,
								1.2065531015396118,
								4.578973770141602,
								2.351515769958496,
								2.9505105018615723,
								2.4308571815490723,
								2.1237339973449707,
							)}
						/>
		</>
	)
}

export default Landing;
