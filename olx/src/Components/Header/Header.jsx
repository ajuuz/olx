import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import {auth,googleProvider} from '../../firebase/firebase.js'
import {useNavigate} from 'react-router-dom'
// hooks
import React, { useState,useEffect,useContext } from 'react'
import { searchContext } from '../../SearchContext.jsx'

// image
import olxLogo from '../../assets/22_OLX-512.webp'

// css
import './Header.css'

// components
import Language from './Language.jsx'
import ProfileMenu from './ProfileMenu.jsx'
import Location from './Location.jsx';
import Login from './Login.jsx' 

// importing userContext
import { useUser } from '../../UserProvider.jsx'

const Header = () => {

  // states
const [menu,setMenu] = useState(false)
const [englishMenu,setEnglishMenu] = useState(false);
const [profileMenu,setProfileMenu] = useState(false)  
const [inputMenu,setInputMenu] = useState(false)
const [loginPop,setLoginPop] = useState(false)


// context search 
const {filter,setFilter} = useContext(searchContext)

// for routing
const navigate= useNavigate();

// useContext for user logged in
const { user ,setUser} = useUser();


// for menu to disappear when screen size increases
useEffect(() => {
    const handleResize = () => {
      
      if (window.innerWidth >= 768) {
        setMenu(false); 
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    
    return () =>{ window.removeEventListener('resize', handleResize);
        console.log("unmout")
    }
  }, [menu]);


// login
  const googleSignin = async()=>{
    try{
       const result =  await signInWithPopup(auth,googleProvider)
      setLoginPop(false);
    }
    catch(err){
        console.error(err)
    }
  }

  // logout
  const googleSignOut = async ()=>{
    try{
      await signOut(auth);
      setProfileMenu(false)
    }
    catch(err)
    {
      console.error(err)
    }
  }


  // navigate for seller page
  function handleNavigate(){
    navigate('/sellpage')
  }

  return (
    <>
    <div>
        {
            menu?
            (<div>
                <div className="nav-logo flex items-center">
                <i onClick={()=>setMenu(!menu)} class="fa-solid fa-xmark text-lg font p-5 lg:hidden"></i>
                <img className='h-12 me-10' src={olxLogo} alt="olx logo" />
            </div>
            <div className='p-5'>
              {user
              ?<img src={user.photoURL} className='inline-block me-10' style={{ width: "70px", height: "70px", borderRadius: '50%' }} />
              :<i class="fa-solid fa-user me-4"></i>
            }
            <span className='font-bold'>{user?user.displayName:"User_Name"}</span>
            </div>
            <hr />
           <div className='menu-div p-5'>
            <div className='py-3'>
           <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="opacity-50" fill-rule="evenodd"><path class="rui-w4DG7" d="M830.798 448.659L512 838.574L194.172 449.881C173.712 422.71 162.909 390.536 162.909 356.848C162.909 271.282 232.514 201.697 318.061 201.697C390.187 201.697 450.812 251.248 468.112 318.06H555.889C573.188 251.248 633.794 201.697 705.94 201.697C791.486 201.697 861.091 271.282 861.091 356.848C861.091 390.536 850.289 422.71 830.798 448.659M705.94 124.121C625.086 124.121 553.736 165.547 512 228.325C470.264 165.547 398.914 124.121 318.061 124.121C189.731 124.121 85.3335 228.499 85.3335 356.848C85.3335 407.505 101.527 455.796 133.14 497.745L461.906 899.879H562.095L891.811 496.524C922.473 455.796 938.667 407.505 938.667 356.848C938.667 228.499 834.269 124.121 705.94 124.121"></path></svg>
           <span>My ADS</span>
           </div>
           <div className='py-3'>
           <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="opacity-50" fill-rule="evenodd"><path class="rui-w4DG7" d="M426.667 42.667h170.667l42.667 42.667-42.667 42.667h256l42.667 42.667v768l-42.667 42.667h-682.667l-42.667-42.667v-768l42.667-42.667h256l-42.667-42.667 42.667-42.667zM213.333 896h597.333v-682.667h-597.333v682.667zM469.333 426.667v-85.333h256v85.333h-256zM298.667 426.667v-85.333h85.333v85.333h-85.333zM469.333 597.333v-85.333h256v85.333h-256zM298.667 597.333v-85.333h85.333v85.333h-85.333zM469.333 768v-85.333h256v85.333h-256zM298.667 768v-85.333h85.333v85.333h-85.333z"></path></svg>
           <span>Buy Business Packages</span>
           </div>
           <div className='py-3'>
           <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="opacity-50" fill-rule="evenodd"><path class="rui-w4DG7" d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z"></path></svg>
           <span>Bought Packages & Billing</span>
           </div>
           <hr className='my-5' />
           <div className='py-3'>
           <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="opacity-50" fill-rule="evenodd"><path class="rui-w4DG7" d="M550.789 744.728c0 21.41-17.377 38.789-38.789 38.789s-38.789-17.377-38.789-38.789 17.377-38.789 38.789-38.789 38.789 17.377 38.789 38.789zM686.546 415.030c0 82.89-58.105 152.513-135.757 170.201v43.131l-38.789 38.789-38.789-38.789v-77.575l38.789-38.789c53.489 0 96.97-43.481 96.97-96.97s-43.481-96.97-96.97-96.97-96.97 43.481-96.97 96.97l-38.789 38.789-38.789-38.789c0-96.232 78.312-174.546 174.546-174.546s174.546 78.312 174.546 174.546zM512 861.090c-192.505 0-349.090-156.626-349.090-349.090 0-192.505 156.587-349.090 349.090-349.090 192.466 0 349.090 156.587 349.090 349.090 0 192.466-156.626 349.090-349.090 349.090zM512 85.333c-235.288 0-426.667 191.379-426.667 426.667s191.379 426.667 426.667 426.667 426.667-191.379 426.667-426.667-191.379-426.667-426.667-426.667z"></path></svg>
           <span>Help</span>
           </div>
            <div className='py-3'>
            <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="opacity-50" fill-rule="evenodd"><path class="rui-w4DG7" d="M873.997 456.711H819.182C811.047 414.001 794.347 374.323 770.704 339.651L809.444 300.892V259.727L767.653 217.918H726.489L687.73 256.677C653.058 233.054 613.38 216.334 570.67 208.199V153.384L541.552 124.266H482.455L453.337 153.384V208.199C410.628 216.334 370.949 233.054 336.277 256.677L297.518 217.918H256.334L214.544 259.727V300.892L253.303 339.651C229.661 374.323 212.96 414.001 204.825 456.711H150.011L120.893 485.829V544.926L150.011 574.044H204.825C212.96 616.753 229.661 656.431 253.303 691.103L214.544 729.863V771.047L256.334 812.837H297.518L336.277 774.078C370.949 797.72 410.628 814.421 453.337 822.556V877.37L482.455 906.488H541.552L570.67 877.37V822.556C613.38 814.421 653.058 797.72 687.73 774.078L726.489 812.837H767.653L809.444 771.047V729.863L770.704 691.103C794.347 656.431 811.047 616.753 819.182 574.044H873.997L903.115 544.926V485.829L873.997 456.711ZM512.004 750.044C382.605 750.044 277.337 644.776 277.337 515.377C277.337 385.978 382.605 280.711 512.004 280.711C641.403 280.711 746.67 385.978 746.67 515.377C746.67 644.776 641.403 750.044 512.004 750.044ZM512.004 350.839C421.266 350.839 347.463 424.641 347.463 515.379C347.463 606.117 421.266 679.92 512.004 679.92C602.741 679.92 676.544 606.117 676.544 515.379C676.544 424.641 602.741 350.839 512.004 350.839ZM512.004 601.697C464.405 601.697 425.685 562.977 425.685 515.379C425.685 467.781 464.405 429.061 512.004 429.061C559.602 429.061 598.322 467.781 598.322 515.379C598.322 562.977 559.602 601.697 512.004 601.697Z"></path></svg>
           <span>Settings</span>
           </div>
           <div className='py-3'>
            {user
            ?<><svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="opacity-50" fill-rule="evenodd"><path class="rui-w4DG7" d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path></svg>
            <span onClick={googleSignOut}>Logout</span>
            </>
            :<span onClick={()=>setLoginPop(!loginPop)}>Login</span>
          }
           
           </div>
           </div>
            </div>)


            :


            (<>
            <nav className='bg-gray-100 py-3 flex justify-between items-center lg:justify-around '>
            <div className="nav-logo flex items-center">
            <i onClick={()=>setMenu(!menu)} class="fa-solid fa-bars text-lg font mx-3 lg:hidden"></i>
                <img className='h-12 me-10' src={olxLogo} alt="olx logo" />
            </div>
            <div className="search-bar relative hidden w-[1000px] lg:flex me-3">
                <input value="Kerala" className='w-[300px] bg-transparent rounded p-2 text-black border' type="text" />
                <i onClick={()=>setInputMenu(!inputMenu)} class={`${inputMenu?"caretUpwarding":"caretDownwarding"} fa-solid fa-caret-down absolute text-2xl top-2 left-[270px]`}></i>
                {inputMenu
                ?<Location/>
                :null
                }
                <input onChange={(e)=>setFilter({substring:(e.target.value).trim()})} placeholder='Find cars, Mobiles Phones and more' className='ps-5 second-search flex-1 bg-transparent  ms-4 text-black border' type="text" />
                <div><svg width="50px" height="50px" viewBox="0 0 1024 1024" data-aut-id="icon" class="p-3 md:h-12 fill-white bg-black rounded-r-md hidden md:block hover:cursor-pointer" fill-rule="evenodd"><path class="rui-o3KKi" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path></svg></div>
            </div>
            <div className="nav-profile hidden lg:flex items-center justify-between w-[250px] me-5 ">
                <div>
                <span className='me-4 relative'>ENG</span>
                <i onClick={()=>setEnglishMenu(!englishMenu)} className={`fa-solid fa-caret-down ${englishMenu?"caretUpwarding":"caretDownwarding"}`}></i>
                {
                englishMenu
                ?<Language/>
                :null
                }
                </div>
                <i class="mb-2 fa-regular fa-message mt-2"></i>
                <i class="mb-2 fa-regular fa-bell mt-2"></i>
                <div className='relative'>
                  {user
                  ?<><img src={user.photoURL} className='inline-block me-3' style={{ width: "30px", height: "30px", borderRadius: '50%' }} />
                <i onClick={()=>setProfileMenu(!profileMenu)} class={`fa-solid fa-caret-down ${profileMenu?"caretUpwarding":"caretDownwarding"}`}></i>
                {profileMenu
                ?<ProfileMenu googleSignOut={googleSignOut} userName={user.displayName}/>
                :null
                }</>
                : <span onClick={()=>setLoginPop(!loginPop)} className='rounded '>Login</span>
                 }
                
                </div> 
            </div>
                <div className='lg:hidden me-3'>
                    <span className='me-3'>Kerala</span>
                <i class="fa-solid fa-location-dot"></i>
                </div>
               <div onClick={user?handleNavigate:()=>setLoginPop(!loginPop)} class="hover:cursor-pointer fixed z-[36] bottom-8 lg:bottom-0 left-[50%] translate-x-[-50%] lg:left-0 lg:translate-x-0 w-26 lg:relative shadow-2xl rounded-full"><svg width="104" height="48" viewBox="0 0 1603 768" class="_20oLV"><g><path class="_32cGm _3Vwmt fill-white" d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"></path><path class="_32cGm _3XfCS fill-yellow-400" d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"></path><path class="_32cGm _1DrSr fill-blue-500" d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"></path><path class="_32cGm HKswn fill-teal-500 " d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"></path></g></svg><div class="_3xUC8 absolute flex top-3 left-6 justify-center items-center gap-1"><span class="_3vzlb"><svg width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-lquEm" d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"></path></svg></span><span>SELL</span></div></div>
          </nav>
          <div className='navbar-secondPanel flex justify-center lg:hidden pb-5 bg-gray-100 '>
            <input type="text" placeholder='Find cars, Mobiles Phones and more' className=' bg-transparent second-panel-input w-[90%] p-2' />
          </div>
          </>)
        }
      
    </div>
    
    {loginPop && <Login googleSignin={googleSignin} setLoginPop={setLoginPop}/>}
    </>
  )
}

export default Header
