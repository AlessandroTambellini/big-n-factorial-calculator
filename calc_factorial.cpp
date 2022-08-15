#include <iostream>
#include <string>
#include <ctype.h>
#include <stdlib.h>
#include <cstring>

/* the 3 lines below mean: include the header file <emscripten.h>
only if the compiler is Emscripten. In this way you can reuse this same
file for other applications (es. the desktop version of the app)
that doesn't need WASM */
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

struct Node
{
    int data;
    Node *next;
    Node(int d)
    {
        data = d;
        next = nullptr;
    }
};

/*
In C++ there's function overloading (functions with same name but different
parameters), so, the compiler alterate the name to make it unique.
But this is a problem for external code that want to call a function by name.
Thus through the below command the compiler undestand that it cannot modify the function
names
*/
#ifdef __cplusplus
extern "C"
{
#endif

    char *generateFactorial(Node *tail)
    {
        unsigned nSize = 0;
        Node *curr = tail;
        while (curr)
        {
            curr = curr->next;
            nSize++;
        }
        char factorial[nSize + 1];
        char strValue[2];
        while (tail)
        {
            sprintf(strValue, "%d", tail->data);
            strcat(factorial, strValue);
            tail = tail->next;
        }
        return factorial;
    }

    void multiply(Node *tail, int n)
    {
        Node *temp = tail, *nextNode = tail;
        int carry = 0;
        while (temp != nullptr)
        {
            int value = temp->data * n + carry;
            temp->data = value % 10;
            carry = value / 10;
            nextNode = temp;
            temp = temp->next;
        }
        while (carry != 0)
        {
            nextNode->next = new Node((int)(carry % 10));
            carry /= 10;
            nextNode = nextNode->next;
        }
    }

/*
Specify that the immediately below function needs to be exported
to be called by JavaScript code.
*/
#ifdef __EMSCRIPTEN__
    EMSCRIPTEN_KEEPALIVE
#endif
    char *calc_factorial(int n)
    { // specify the parameters to pass
        Node tail(1);
        for (int i = 2; i <= n; i++)
            multiply(&tail, i);
        return generateFactorial(&tail);
    }

#ifdef __cplusplus
}
#endif
