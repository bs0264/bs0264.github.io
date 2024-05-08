package dataType;

public class Dt02_Char {
   public static void main(String[] args) {
      // char 타입 변수의 값은 ''로 표시 - 문자열(String)은 ""로 표시
      // char 타입 변수 c1을 선언하고 문자 'A'로 초기화 - 알고 보면 정수
      char c1 = 'A';
      char c2 = 65; 
      char c3 = '\u0041';
      System.out.println(c1);
      System.out.println(c2);
      System.out.println(c3);
      
      int ic = c1;
      System.out.println(ic);
      
      char c4 = '가';
      System.out.println(c4);
      
      ic = c4;
      System.out.println(ic);
      
      char c5 = 44033;
      System.out.println(c5);
   }
}