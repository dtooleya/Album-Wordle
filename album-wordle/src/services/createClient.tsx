import {createClient} from "@supabase/supabase-js"

export const supabase = createClient("https://pxkitqcckjnjapabxyqd.supabase.co",
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4a2l0cWNja2puamFwYWJ4eXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTM3MjQsImV4cCI6MjA3Njg4OTcyNH0.YRc00cumjjyA6wHgfjGUgEZujZdBaBman4amysYWoUY");