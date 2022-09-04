import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components";
import { locationService } from "@/services";
import "./index.less";

const SearchPage = () => {
  const navigation = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleTextQueryInput = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;

    setKeyword(text);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      //   if ((navigator?.platform?.toLowerCase().includes("mac") ? e.metaKey : e.ctrlKey) && e.key === "k") {
      //     e.preventDefault();
      //     e.stopPropagation();

      //   }
      //   console.log(e.key);
      if (e.key === "Enter") {
        // eslint-disable-next-line prettier/prettier
                // navigation("/");
        locationService.setTextQuery(keyword);
      }
    }

    // if (!showCmdK) setKeyword("");

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyword]);

  return (
    <PageLayout className="search-page">
      <div className="header">
        <div className="searchBox">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <form action="">
            <input autoFocus type="text" placeholder="搜索" onChange={handleTextQueryInput} />
          </form>
        </div>
        <span className="cancel" onClick={() => navigation("/")}>
          取消
        </span>
      </div>
      <div className="body">
        <div className="title">搜索指定内容</div>
        <div className="link">
          <div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANqADAAQAAAABAAAANgAAAADzQy6kAAACsUlEQVRoBe1Yz2sTQRTOhgq24qkUixYcSkkCiQmYXgKlrkehx/4N/hEe/Se8+R/UiydPKhRP4slDEgpOoUSlepKIhJL0e3WnfQ47brIzKwu+gex88943s+9982OnrVSkiAKigCggCogCooAoIAqIAqKAKOBUoNvtrrRarVtOAnPU6/XbcRxfZ6YgsBpkFGuQ8Xj8aDKZfKnVaj8R+DPLbTdfjUYj4n3Gr24787YLSQzBqCSg5dlsdpYR3F34I/DWoyj6lsGd211IYtPpVJkIqtWqNtiuG43GKhK6SXYk9aPf73+3OXnbhSSGYBQLSDNsQ8UMxwx7w0ISg/qKRaYZtqEyBsycNjhEHfkMgr3+2tF/B4EuJb5DJJq6z8DZAGcr4Z2Ad8THGwwGD3l7EWxevkifSy4Ciy8bbkBJur1Xno0k0SuLBypkKXrEE6yr14zhxIvtSKD6Ln5PE/s7cJ7YHNPG6fkceJPa4D1GNSQconglhuP5rR0EjvBttvQ+pHFMH+zRNcZ9UerjvgzfMBKuiD2mzIyg1gzbUDHDMcNBYPDEyvANI2WCJ4Yx6e5nijYgpVbMphkOAoMmtsjdb969mDdLr1MRiTywXlwzbZx2pyl+464gsfumAe5KGvdvJ6rp66q9rlT4e2uuK4Xr5Vn24XCYO76gSzEr0H/p91qKOAHf8GCxpLbQpostlSP4T37DP5/g0Xt3yArOGapDwiFL7qlOCwJL8yXse+TDFWkfe+QgjYf91MUee08+JPYRt/h7aTwfW9CliCAVC0YzbENlDJg9bXDIOmhiCKwU3zASKFhiWF5z//+i6G9Y0MQQ7BoG/EqDouiLp+OBJXsNrl+J+5ODVi5zr9db7nQ6d7Kiwt6Kms3mervdvpHFFb8oIAqIAqKAKCAKiAKigCggCvzPCpwDqrfRM1ZitzcAAAAASUVORK5CYII="
              alt=""
            />
            <span>包含标签</span>
          </div>
          {/* <div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANqADAAQAAAABAAAANgAAAADzQy6kAAAEGElEQVRoBe1YS08TURSmlEbAiqLUx067gEIBQYz4SipQHzWKccHSGI2JicREf4Er1rrBldF/YEzUIIZH0I0KKKltKCzKQgLIQ0GrieFRvw/nmhFpc6fMZIzcm9yec8+cOed859xXJytLNZUBlQGVAZUBlQGVAZUBlQGVgXWWAce/gDcUCm2Ix+N1DofDz3iSyWTU6/V2t7W1/cg0PtuB+Xy+AIA8QN+jBwGQI+iXYrFYj14uyztlFa3QKykpuQxAD2G7cBX7hXh2saio6MPMzMy7VZ6nFdlWMYBihcII3s0IUZ1x8I81/iz4XRqfAK0cGhoa4Vi2Zcsqmq2HwG+hC1C9eXl5ZcPDw1fZyQNoL31Sh7pG/dsGDIEGRbAAcWNgYGBWjMlTJsagDTpeirUNGAL3iAidTmdY8ILqZdDdLuSy1DZgmF5TIsjFxcVKwQuql0F3UshlqW3AEGCHCBKB36mqqtoixuQpE2PQTh0vxf63u6JtwJh27Ry7BzZVHEmsryvY6u9LlUmnZOsBzYPX4/H0IJ4A+h+HNACNZGdnnweoR7p4pdlUmZI2YIaiFXdFM+JKa6OmpsaVVsGih5btimVlZf7i4uJIIpEYB71gUfwpzVqyxnBjr8A51AWvu9Hz0c/hMjuayWUW72bUTAfm9/v3Li0t8dz5fbMAz7XciI1ibHp6+m1GkRp8yVRgmH7VqFQHDtciLY457G7D4HegOyA/g8p9ROX6DMZpWN20NVZaWrpPA7WNUQDQZ/QgbuoB0OWbOsUAdxdr7trKSFFpd1NTk2mJNgUYDtr9ANWJoLdqoD7hDAriDOrjTd3tdh+H/LUGhtOyFevwujbOAtDmhYWFiXA4HKctIV8LXfM5hkwfmJ+ff44gNjMQVGcmJycnGI1GB/SB1dbWFszOzj4D+ENCDt2b5CG7LWSgcy6X6wTef6OTGWbXBAzT7yAq1Q6vBfSMQKdBGlCpv/6G8DmqsQmkDUCOcJymfcHflpODg4Ov0uikfZTxVMRUOozdj5VaBgU6BWD1qUAxCjz7imqeAvuS4xWNIMRfmQLapo8VOtLDjIBhTRxF1tvRWQG2SQRchy9K738NU/9iiiVyc3NDSEKP0CIPWZA2aIty2qYP+hJ6RqjhqYgsBuDwKfpGOkJQE1gT9ZFIZNCIY1y18nEraeY72Fxa+/v7v5MvLy8vxZrtgv2dHMP+N2xEpzEtX3As2wwBwxphRp/AKW8TdMovS/X4ABOTdSijhyr5YJvgxJcqgj6Dqdwt8z51jE7FFh2oMTg/ZjYoBkWbtI0+xrHms4W8bDMEDA4a4YzraBTrIYA1xVuFJY226QPGR+mTvi1xJIxWV1d7KioqvGJsNaUv+rTaj7KvMqAyoDKgMqAyoDKgMqAysH4y8BM4SaTbN/jJ7gAAAABJRU5ErkJggg=="
              alt=""
            />
            <span>包含图片</span>
          </div> */}
          <div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANqADAAQAAAABAAAANgAAAADzQy6kAAAESUlEQVRoBe1YO0yTURTu2yAEfCQuhhibyMM2PNrIBKIRIR1g0LA5osbVOOgiZdLExNEEcMQ4NHGQgUg0asNoEZBKaRqMGgdJlGKKxJZSv1P/01yblra3f+vg/ZPLOffR/37fOfe/5xwMBvUoCygLKAsoCygLKAsoCygLKAv8ZxYw/iu+ra2tfclkchj7t6E1GI3Gdci5VCo1FQ6HQ+Xiqjoxp9PZGI/HHwF4Tx7wSZAct9vt12dmZn7lWVNwuKrEHA5HeyKRmAWqI4WQgdxrkBuQJWcqtIFe80RqZ2fnhUAqBX3SZDINWa3WThC5hL6f98OR7F1bW7vP/VJlVTzGpAD2MAEEiQ2Ii6urqy9FwJg34tvz7u7u3tbGk5BOmW+u4h7LJgWgURA7n02KiGA8tbKy4oXKnjNrnqTpkp6KEgOpk3T82FNAFsXR6wuFQoF8KIkc2oQw3y3oRasVI9bR0XEAF8V0KaQYtcViCbKO3xe8aHitKC1iR099e3v7Ft5np3fCAzG0PT0l7o341ij0NwW9aLUiHnO73VZY+iqjAKkbex0/XscSl8cg65BLgl60WhFiW1tbp4CgQUPxBReC+M2khz0ez75cKJubm89ifITnzGazj/VSZEWIweKZowRvzaNRzMo8LS0tXsSop8PDw+bMIBSMu+HpJ1A5DPlhlOfimmL1ihCDleMCgDpBNzQ1NY2C+CgI9C8tLV3mOcQvF8aJxAFtbN1ms1HQlnrKJkZxCmDncYSOMwKAjgi6C9/cfu7De4dYh7zJOkhtYO4H9SG/IRvpX15e/szzpcqyiHHwxaadaK+YHC6KdwD3UQPTEIvF7jCwuro6ui3TNx0McAyectIcAvYHiDNob3HdnwsGg4vQpR9pYpSlU0ILcOk0CbIewfeggOQu65j7znogEPgJ0vPchzzBOpFD+uQqlxS9T5qYVnpw8ExnFPjQM4Db2tomQWAWZMcAdozBazLGfcQsG+t6SiliVCQCRI8GhFKgC9lxyufzJVF2DGHcKwKG94xoLh4D8U+s6ymliGmVL+N4mCuhpclctRSudArcR7Ufb9bW1r7RdF2FFDEgaGcUsPg064UkxSmsucfr4OlxfHMJ7uspZXPFegaBmFXUlUyktDjFcW2tpqYmc1vy+/SSUh6DpekfL+kHZYmD9XxSIJUOvvg9xanBhYWFaL7flDsuRQybzvHGuAiu0IXA/WyZi5QWp95nr9WzL0UMRKYAgsp2ek5TOZ+LHCW0YppEntIj+P7Zdu+/eS29988MBoB+ADLXhHV+AJ+gIpHqKRCi0mMELb1HNUkRJmliVHYgQ38Gcr30ogLPV3xTA3pkFAX2yUz/VTZkRotQIpFIsqur63E0GqWUigJuvmPtR5buAalwEa/VbYm0x0QEyO5bcNSoxOiGBynNoix9kYpE2XpKfL/SlQWUBZQFlAWUBZQFlAWUBZQFlAWKsMBvUjip1UJPWEsAAAAASUVORK5CYII="
              alt=""
            />
            <span>包含链接</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchPage;
