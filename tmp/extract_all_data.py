with open('/tmp/doc_app.js', 'r') as f:
    content = f.read()

def extract_variable(var_name, start_char, end_char):
    # Find something like: "var_name = [" or "var_name = {" or "var_name=[" or "var_name={"
    # Let's search for "var_name" first, then find the equals sign and the start character
    idx = 0
    while True:
        idx = content.find(var_name, idx)
        if idx == -1:
            print(f"Could not find variable {var_name}")
            return None
        
        # Check if it's a word boundary
        is_word = True
        if idx > 0 and (content[idx-1].isalnum() or content[idx-1] == '_'):
            is_word = False
        after_idx = idx + len(var_name)
        if after_idx < len(content) and (content[after_idx].isalnum() or content[after_idx] == '_'):
            is_word = False
            
        if is_word:
            # Look for '=' and start_char within the next 40 characters
            search_area = content[after_idx : after_idx + 40]
            eq_idx = search_area.find('=')
            char_idx = search_area.find(start_char)
            if eq_idx != -1 and char_idx != -1 and char_idx > eq_idx:
                # Found it! Let's get the absolute index of start_char in content
                brace_idx = after_idx + char_idx
                break
        idx += len(var_name)
        
    # Trace balanced braces
    count = 0
    i = brace_idx
    while i < len(content):
        c = content[i]
        if c == start_char:
            count += 1
        elif c == end_char:
            count -= 1
            if count == 0:
                return content[brace_idx : i + 1]
        i += 1
    return None

# Extract variables
translations_val = extract_variable('ei', '{', '}')
categories_val = extract_variable('Pn', '[', ']')
articles_val = extract_variable('M4', '[', ']')
resources_val = extract_variable('C4', '[', ']')
quizQuestions_val = extract_variable('Si', '[', ']')
governorates_val = extract_variable('E4', '[', ']')
filterGovernorates_val = extract_variable('R4', '[', ']')

output_content = f"""// Multi-language translations and clinical data for Docsexprime.tn
import {{
  BookOpen,
  Bot,
  Heart,
  Lock,
  MapPin,
  MessageSquare,
  PhoneCall,
  Phone,
  Plus,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Trash2,
  AlertTriangle,
  User,
  Users,
  X,
  ArrowLeft,
  ArrowRight,
  Award,
  Compass,
  FileText,
  Check,
  ChevronRight,
  CircleCheck,
  CircleAlert,
  Clock
}} from 'lucide-react';

export const translations: any = {translations_val};

export const categories: any[] = {categories_val};

export const articles: any[] = {articles_val};

export const resources: any[] = {resources_val};

export const quizQuestions: any[] = {quizQuestions_val};

export const governorates: string[] = {governorates_val};

export const filterGovernorates: string[] = {filterGovernorates_val};

export const getCategoryIcon = (name: string) => {{
  switch (name) {{
    case 'body': return User;
    case 'heart': return Heart;
    case 'shield': return Shield;
    case 'users': return Users;
    case 'star': return Compass;
    case 'file-text': return FileText;
    default: return BookOpen;
  }}
}};
"""

with open('./src/data.ts', 'w') as f_out:
    f_out.write(output_content)

print("Data extracted successfully into ./src/data.ts")
