//한 파일에 여러 클래스를 만들 수 있으나 compile 하면 분리된 클래스 파일로 생성됨 
//public 클래스는 하나만 있어야 하고, 그 클래스 이름이 파일 이름과 같아야 한다

class Hi{
	//메소드(method)
	public void hi() {
		System.out.println("hi!!!");
	}
}


public class test {
	public static void main(String[] args) {
		System.out.println("wow");
		Hi hi = new Hi();
		hi.hi();
	}
}
