//html 주석 <!-- -->
//javascript 주석: // or /* */

//javadoc - 설명서 작성용
/*************************************************
 * @author Ace
 * @version 1.0.0
 *
 * 주석 종료 설명하는 문서
 *************************************************/

//한 줄 주석 - 일반적으로 대상의 위에 단다

//public: 클래스의 스코프
//class: //클래스 선언
//Comment: 클래스 이름: 첫 글자 - 대문자, $, _/ 여러 단어 - CamelCase
//{ } : 클래스 내용(필드, 생성자, 메소드)
public class Comment { //클래스 선언
	//main 메소드: 모든 자바 프로그램의 시작점, 유일한 실행 메소드
	//static: 정적, 클래스 생성 전에 미리 생성 -나중에 배울 것
	// void: method가 명령을 수행하고 결과를 반환하지 않는 것 - return이 없음
	   // ( ): 매개변수 받는 자리
	   // String[] args: 매개변수 - 문자열 배열
	   // { }: 메소드가 실행할 내용
	public static void main(String[] args) {
		//System 클래스의 out 스트림을 이용해서 println 메소드를 실행하라
		System.out.println("이클립스 편하네");
		
		/*
		 * 여러 줄 주석
		 * 부분 주석
		*/
	}
}
