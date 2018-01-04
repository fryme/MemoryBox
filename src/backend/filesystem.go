package main

func pathAppend(path string, toAppend string) string {
	result := path //string("")
	if path[len(path)-1] != '/' {
		result += "/"
	}
	result += toAppend
	return result
}
