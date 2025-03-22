#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

bool ispangram(char *s)
{
  uint32_t bitSet = 0;

  for (int i = 0; i < strlen(s); i++)
  {
    char lowerChar = tolower(s[i]);

    if (lowerChar >= 'a' && lowerChar <= 'z')
    {
      bitSet |= (1 << (lowerChar - 'a'));
    }
  }

  return bitSet == 0x03ffffff;
}

int main()
{
  size_t len;
  ssize_t read;
  char *line = NULL;
  while ((read = getline(&line, &len, stdin)) != -1)
  {
    if (ispangram(line))
      printf("%s", line);
  }

  if (ferror(stdin))
    fprintf(stderr, "Error reading from stdin");

  free(line);
  fprintf(stderr, "ok\n");
}
