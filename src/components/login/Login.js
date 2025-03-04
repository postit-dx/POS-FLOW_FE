import React, {useState} from 'react';
import "/src/styles/css/login/Login.css";
import Header from '/src/components/login/Header';
import axios from 'axios';

function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post('/user/login', {
                accountId : id,
                password : password
            });
            
            // console.log(response.data);

            const result = response.data.result;
            if (result === "success") {
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("isAdmin", response.data.data.isAdmin);
                window.location.href = "/vehicle";
            }
        } catch(err) {
            setIsCorrect(false);  
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    return (
        <div className={"Total"}>
            <Header />
            <div className={"Login"}>
                <p className="Login_Text">로그인</p>
                <div>
                    <form
                        className={"Main"}
                        onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type={"text"}
                            name={"id"}
                            placeholder={"ID"}
                            value={id}
                            onChange={e => setId(e.target.value)}
                            autoFocus
                        />
                        <input 
                            type={"password"}
                            name={"password"}
                            placeholder={'Password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleLogin(e);
                                }
                            }}
                        />
                        <p className={isCorrect ? "Login_Alert" : "Login_Alert_View"}>아이디 또는 비밀번호가 틀렸습니다.</p>
                        <button
                            className={"Button"}
                            onClick={handleLogin}>
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;