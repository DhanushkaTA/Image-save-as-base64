import './App.css'
import {useRef, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import axios from "axios";

function App() {

    const fileChooser :any = useRef();
    const imageRef:any = useRef();
    const [profilePic, setProfilePic] = useState<any>('')
    const [avatarImage, setAvetarImage] = useState("src/assets/images/icon/avator.png")

    const [imageId, setImageId] = useState('')

    function clickProfile(){
        fileChooser.current.click();
    }

    async function setProfileImage(event:any) {
        console.log(event.target.files[0])
        const base64url = await convertToBase64(event.target.files[0]);
        console.log(base64url)
        setProfilePic(base64url)
    }

    function convertToBase64(file:any) {
        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    function handleId(event) {
        console.log(event.target.value)
        setImageId(event.target.value)
    }

    async function sendData(){

        const data = {
            id:Date.now(),
            img:profilePic
        }

        await axios.post('http://localhost:9000/image/upload',data)
            .then(response => {
                alert(response.data.message)
                console.log(response.data)
                setProfilePic('')
            })
            .catch(error => {
                alert(error)
            })

    }

    async function getData(){

        console.log(`http://localhost:9000/image/get/${imageId}`)

        await axios.get(`http://localhost:9000/image/get/${imageId}`)
            .then(response => {
                alert(response.data.message)
                console.log(response.data)
                setProfilePic(response.data.data.image)
            })
            .catch(error => {
                alert(error)
            })

    }


  return (
      <>

          {/*Profile pic -----------------------------------------------*/}
          <div className={'flex flex-col items-center justify-center'}>
              <div
                  className={"w-[160px] h-[160px] border border-white rounded-[50%] flex justify-center items-center"}>
                  <img id={"profilePic"}
                       src={`${profilePic ? profilePic : avatarImage}`}
                       alt={"profile"} title={"profile"}
                       className={"w-36 h-[148px] rounded-[50%] bg-[#E8E8E8] cursor-pointer"}
                       onClick={clickProfile}
                       ref={imageRef}/>
              </div>


              <input ref={fileChooser} id={"fileSelect"} type={"file"} className={"hidden"}
                     onChange={() => setProfileImage(event)}/>
          </div>

          <div className={"flex flex-col items-center justify-center gap-3 mt-3"}>
              <button
                  onClick={sendData}
                  className={"w-[200px] h-[50px] bg-yellow-300 text-white"}>
                  Save Image
              </button>

              <input type={'text'} className={'w-[250px] h-[50px] rounded-lg p-2'} onChange={(event) => handleId(event)}/>

              <button
                  onClick={getData}
                  className={"w-[200px] h-[50px] text-white"}>
                  Get Image
              </button>
          </div>

      </>
  )
}

export default App
