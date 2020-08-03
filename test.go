package main

import (
	"fmt"
	"strings"
)

func getCharCount(s string) map[string]int {
	m := make(map[string]int)
	var stringArray []string = strings.Fields(s)
	for _, c := range stringArray {
		m[c]++
	}
	return m
}

func main() {
	fmt.Println(getCharCount("aaabbc s"))
}
