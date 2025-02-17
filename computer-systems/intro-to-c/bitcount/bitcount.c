#include <stdio.h>
#include <assert.h>

int bitcount(unsigned num)
{
  int sum = 0;

  while (num != 0)
  {
    sum += (num & 0b1);
    num >>= 1;
  }
  return sum;
}

int main()

{
  assert(bitcount(0) == 0);
  assert(bitcount(1) == 1);
  assert(bitcount(3) == 2);
  assert(bitcount(8) == 1);

  assert(bitcount(0xffffffff) == 32);

  printf("Ok\n");
}
