// import main from '../../imgs/dhabi.jpg'
import './Home.css'
import modern from '../../imgs/modernRoom.webp'
import luxury from '../../imgs/roomluxry.webp'
import aboutimage from '../../imgs/about-section.avif'
import Footer from './footer/Footer'
import { useNavigate } from 'react-router-dom'

const Home = ({notAuth}) => {
  const navigate = useNavigate();
  if(notAuth){
    console.log("auth: please login");
  }
  return (
    
    <div className='home'>
      <section className="home-main">
        <div className="home-search">
          <div className="search-filters">
            <button onClick={()=> navigate("/buy")}>للبيع</button>
            <button onClick={()=> navigate("/rent")}>للايجار</button>
          </div>
          {/* <div className="search-bar">
            <button>ابحث</button>
            <button><i className="fa-solid fa-caret-down"></i> نوع العقار</button>
            <button><i className="fa-solid fa-caret-down"></i> غرف وحمامات</button>
            <div className="search-input">
              <input type="text"  placeholder='اكتب اسم المدينة او المنطقة او نوع العقار'/>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>  */}
        </div>
      </section>
      <section className="home-places">
        {/* <h2>اكتشف المزيد</h2>
        <nav>
          <ul>
            <li>للايجار</li>
            <li>للبيع</li>
          </ul>
        </nav>
        <div className="places">
          <button className="places-btn">القاهرة</button>
          <button className="places-btn">الجيزة</button>
          <button className="places-btn">الاسكندرية</button>
        </div> */}
        <h1>
            {/* Discover Your Dream Home with Our Exclusive Properties */}
            اكتشف منزل أحلامك مع عقاراتنا الحصرية
        </h1>
        <div className="feature-container">
          <div className="provided-featur right">
            <img src={modern} alt="Modern Units" />
            <div className="provided-text">
              <p>
                {/* Explore our modern units designed for comfort and style.
                From cozy studios to spacious penthouses, our properties cater to every lifestyle. */}
                استكشف وحداتنا الحديثة المصممة للراحة والأناقة.
                من الاستوديوهات المريحة إلى البنتهاوس الواسعة، عندنا كل اللي تحتاجه.
              </p>
            </div>
          </div>
        </div>
        <div className="provided-featur left">
          <div className="provided-text">
            <p>
              اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم.
              ابحث عن بيت أحلامك معانا النهاردة
              {/* Enjoy stunning views and elegant living spaces in our properties.
              Choose from urban lofts to townhouses, each crafted for sophistication and charm. */}
            </p>
          </div>
          <img src={luxury} alt="Luxury Living" />
        </div>
        <div className="provided-featur right">
          <img src={aboutimage} alt="Exceptional Customer Service" />
          <div className="provided-text">
            <p>
              استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة.
              إحنا هنا علشان نلبي احتياجاتك ونضمن إنك تكون راضي تمامًا عن كل حاجة في عملية الشراء والتسليم.
              {/* Discover luxury living in our exclusive properties with state-of-the-art
              amenities and designer interiors. Find your dream home with us today. */}
            </p>
          </div>
        </div>
        <div className="provided-featur left">
          <div className="provided-text">
            <p>
            استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختار بين الشقق الحضرية والمنازل الريفية، كل حاجة مصممة بأناقة وسحر."

              {/* Enjoy stunning views and elegant living spaces in our properties.
              Choose from urban lofts to townhouses, each crafted for sophistication and charm. */}
            </p>
          </div>
          <img src={luxury} alt="Luxury Living" />
        </div>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default Home


{/*
عامية
"استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة. إحنا هنا علشان نلبي احتياجاتك ونضمن إنك تكون راضي تمامًا عن كل حاجة في عملية الشراء والتسليم."

"استكشف وحداتنا الحديثة المصممة للراحة والأناقة. من الاستوديوهات المريحة إلى البنتهاوس الواسعة، عندنا كل اللي تحتاجه."

"استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختار بين الشقق الحضرية والمنازل الريفية، كل حاجة مصممة بأناقة وسحر."

"اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم. ابحث عن بيت أحلامك معانا النهاردة
*/}

{/*
فصحي
"استمتع بخدمة عملاء ممتازة وتجربة استلام سلسة لقطعتك الجديدة. نحن هنا لتلبية احتياجاتك وضمان رضاك التام عن كل تفاصيل عملية الشراء والتسليم."

"استكشف وحداتنا الحديثة المصممة للراحة والأناقة. من الاستوديوهات المريحة إلى البنتهاوس الواسعة، تلبي ممتلكاتنا كل نمط حياة."

"استمتع بإطلالات خلابة ومساحات معيشة أنيقة في ممتلكاتنا. اختر بين الشقق الحضرية والمنازل الريفية، كل منها مصمم للأناقة والسحر."

"اكتشف العيش الفاخر في ممتلكاتنا الحصرية مع وسائل الراحة الحديثة والديكور الداخلي المصمم. ابحث عن منزل أحلامك معنا اليوم."
*/}
{/* 
english
"Explore our modern units designed for comfort and style. From cozy studios to spacious penthouses, our properties cater to every lifestyle."

"Enjoy stunning views and elegant living spaces in our properties. Choose from urban lofts to townhouses, each crafted for sophistication and charm."

"Discover luxury living in our exclusive properties with state-of-the-art amenities and designer interiors. Find your dream home with us today."

"Enjoy excellent customer service and a smooth delivery experience for your new piece. We are here to meet your needs and ensure your complete satisfaction with every detail of the purchase and delivery process."
*/}